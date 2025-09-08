import { useState } from "react";
import { useAuth } from "../context/AuthContext"
import Button from '../components/Button.jsx'
import { useRef } from "react";
import useUser from "../hooks/useUser.js";
import { data } from "react-router-dom";

export default function ProfileSetting(){
    const {user, setUser} = useAuth();
    const {updateUserMutation} = useUser()
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

        // Check if email is valid
        const email = formData.get("email");
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        
        updateUserMutation.mutate({
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            contact_number: formData.get('contact_number'),
            email: formData.get('email')
        }, {
            onSuccess: () => {
                setUser(userInfo);
                setDisableEdit(true);
            },
        }
        );
    };

    return(
        <div className="flex flex-col sm:flex-row w-full h-fit gap-4"> 
            {/* Image Placeholder */}
            <div className="w-[100px] h-[100px] self-center sm:self-start bg-accent shrink-0 rounded-full"/>

            {/* User name */}
            <form className="flex flex-col w-full" onSubmit={handleInfoChange}>
                <div className="flex flex-col w-full gap-2">
                    <h3 className="font-semibold text-accent">Name Information</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <h5 className="w-full">
                            First Name 
                            <input 
                                ref={inputRef}
                                name={'first_name'}
                                disabled={disableEdit}
                                type="text" 
                                className="w-full" 
                                value={userInfo.first_name}
                                required={true}
                                onChange={(e) => {
                                    setUserInfo({...userInfo, first_name:e.target.value})
                                }}
                            />
                        </h5>
                        <h5 className="w-full">
                            Last Name 
                            <input 
                                disabled={disableEdit}
                                name={'last_name'}
                                type="text" 
                                className="w-full" 
                                value={userInfo.last_name}
                                required={true}
                                onChange={(e) => {
                                    setUserInfo({...userInfo, last_name:e.target.value})
                                }}
                                />
                        </h5>
                    </div>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-accent mt-10">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <h5 className="">Contact Number</h5>
                        <input 
                            disabled={disableEdit}
                            name={'contact_number'}
                            type="text" 
                            className={`${!userInfo.contact && ('border-1 border-red-500')}`}
                            placeholder="Enter Contact Number"
                            value={userInfo.contact}
                            required={true}
                            onChange={(e) => {
                                setUserInfo({...userInfo, contact:e.target.value})
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-accent mt-10">Email and Socials</h3>
                    <div className="grid grid-cols-2 gap-2 items-center">
                        <h5 className="">Email</h5>
                        <input 
                            disabled={disableEdit}
                            name={'email'}
                            type="text" 
                            className="" 
                            placeholder="Your email"
                            value={userInfo.email}
                            required={true}
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            onChange={(e) => {
                                setUserInfo({...userInfo, email:e.target.value})
                            }}
                        />
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