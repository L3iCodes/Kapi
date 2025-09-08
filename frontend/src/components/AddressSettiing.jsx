import { useState } from "react";
import { useAuth } from "../context/AuthContext"
import Button from '../components/Button.jsx'
import { useRef } from "react";
import useUser from "../hooks/useUser.js";

export default function AddressSetting(){
    const {user, setUser} = useAuth();
    const {updateAddressMutation} = useUser()
    const [userInfo, setUserInfo] = useState(user);
    const [disableEdit, setDisableEdit] = useState(true);
    const inputRef = useRef()

    const enableEdit = (e) => {
        e.preventDefault()
        setDisableEdit(false);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        }, 0);
    }

    const handleInfoChange = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log(formData.get('house_number'), formData.get('barangay'))

        updateAddressMutation.mutate({
            house_number:formData.get('house_number'),
            street:formData.get('street'),
            barangay:formData.get('barangay'),
            municipality_city:formData.get('municipality_city'),
            province:formData.get('province'),
            region:formData.get('region'),
            postal_code:formData.get('postal_code'),
        }, {
            onSuccess: () => {
                setUser(userInfo);
                setDisableEdit(true);
            },
        }
        );
    };

    const addressInformation = [
        { id: 'house_number', label: 'House Number', value: userInfo?.address?.house_number || '' },
        { id: 'street', label: 'Street', value: userInfo?.address?.street || '' },
        { id: 'barangay', label: 'Barangay', value: userInfo?.address?.barangay || '' },
        { id: 'municipality_city', label: 'Municipality/City', value: userInfo?.address?.municipality_city || '' },
        { id: 'province', label: 'Province', value: userInfo?.address?.province || '' },
        { id: 'region', label: 'Region', value: userInfo?.address?.region || '' },
        { id: 'postal_code', label: 'Postal Code', value: userInfo?.address?.postal_code || '' }
    ];


    const handleAddressChange = (field, value) => {
        setUserInfo(prev => ({
            ...prev,
            address: {
                ...prev?.address,
                [field]: value
            }
        }));
    };


    return(
        <div className="flex flex-col sm:flex-row w-full h-fit gap-4"> 
            {/* User name */}
            <form className="flex flex-col w-full" onSubmit={handleInfoChange}>
                <div className="flex flex-col w-full gap-2">
                    <h3 className="font-semibold text-accent mt-4">Address Information</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        {addressInformation.map(address => (
                            <h5 key={address.id} className="w-full">
                                {address.label} 
                                <input 
                                    ref={address.id === 'house_number' ? inputRef: null}
                                    name={address.id}
                                    disabled={disableEdit}
                                    type="text" 
                                    className="w-full" 
                                    value={address.value}
                                    required={address.id === 'house_number' ? false : true}
                                    onChange={(e) => handleAddressChange(address.id, e.target.value)}
                                />
                            </h5>
                        ))}
                    </div>
                </div>

                {disableEdit 
                    ? 
                    (
                        <Button 
                            type="button"
                            onClick={enableEdit}
                            className={'mt-10 ml-auto'}
                            variant="secondary"
                            >
                                <h4>Edit Information</h4>
                        </Button>
                    )
                    :
                    (
                        <Button 
                            type="submit"
                            className={'mt-10 ml-auto'}
                            variant="Primary"
                            >
                                <h4>Save Changes</h4>
                        </Button>
                    )
                } 
            </form>
        </div>
    )
}