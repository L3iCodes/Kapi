import { Icon } from "@iconify/react/dist/iconify.js"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

export default function Profile(){
    const { user, handleLogout } = useAuth()
    const [openNav, setOpenNav] = useState(false)
    const [openOrder, setOpenOrder] = useState(true);
    const [openProfile, setOpenProfile] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);
    const [openPreference, setOpenPreference] = useState(false);
    

    return(
        <div className="flex flex-col w-full h-full gap-3 ">
             <div>
                <h2 className="font-bold">Your Profile</h2>
                <h3 className="text-subtext">Personalize and view orders</h3>
            </div>
            
            <div className="flex ">
                
                <div className={`flex flex-col border-1 border-accent  p-3 gap-2 rounded-[5px] relative
                                transition-all ease-in-out duration-100
                                ${!openNav ? 'w-[60px] items-center' : 'w-[200px]'}`}>
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient "/>

                    {/* User info */}
                    <div className="flex gap-2 items-center">
                        <div  onClick={() => setOpenNav(s => !s)} className="flex w-[30px] h-[30px] bg-secondary rounded-full z-10"/>
                        {openNav && (
                            <div className='z-10'>
                                <h4 className="font-bold truncate">{user?.name}</h4>
                                <h5>{user?.email}</h5>
                            </div>
                        )}
                    </div>
                    
                    {/* Profile Navigation */}
                    <div className={`flex flex-col z-10 mt-5 text-subtext font-medium gap-2`}>
                        <div 
                            onClick={() => {
                                setOpenOrder(true);
                                setOpenPreference(false);
                                setOpenAddress(false);
                                setOpenProfile(false)
                            }}
                            className={`flex items-center gap-3 p-1.5 rounded-[5px] cursor-pointer 
                                        ${openOrder ? 'text-text font-bold bg-secondary border-1 border-accent' :
                                        'hover:bg-accent/50 active:bg-accent hover:text-text'} ${!openNav && 'w-fit'}`}>
                            <Icon icon="mdi:cart" width="20" height="20" />
                            {openNav && (
                                <h4>Orders</h4>
                            )} 
                        </div>

                        <div 
                            onClick={() => {
                                setOpenOrder(false);
                                setOpenPreference(false);
                                setOpenAddress(false);
                                setOpenProfile(true)
                            }}
                            className={`flex items-center gap-3 p-1.5 rounded-[5px] cursor-pointer 
                                        ${openProfile ? 'text-text font-bold bg-secondary border-1 border-accent' :
                                        'hover:bg-accent/50 active:bg-accent hover:text-text'} ${!openNav && 'w-fit'}`}>
                            <Icon icon="iconamoon:profile-fill" width="20" height="20" />
                            {openNav && (
                                <h4>Profile</h4>
                            )} 
                        </div>

                        <div 
                            onClick={() => {
                                setOpenOrder(false);
                                setOpenPreference(false);
                                setOpenAddress(true);
                                setOpenProfile(false)
                            }}
                            className={`flex items-center gap-3 p-1.5 rounded-[5px] cursor-pointer 
                                        ${openAddress ? 'text-text font-bold bg-secondary border-1 border-accent' :
                                        'hover:bg-accent/50 active:bg-accent hover:text-text'} ${!openNav && 'w-fit'}`}>
                            <Icon icon="bitcoin-icons:address-book-filled" width="20" height="20" />
                            {openNav && (
                                <h4>Address</h4>
                            )} 
                        </div>

                        <div 
                            onClick={() => {
                                setOpenOrder(false);
                                setOpenPreference(true);
                                setOpenAddress(false);
                                setOpenProfile(false)
                            }}
                            className={`flex items-center gap-3 p-1.5 rounded-[5px] cursor-pointer 
                                        ${openPreference ? 'text-text font-bold bg-secondary border-1 border-accent' :
                                        'hover:bg-accent/50 active:bg-accent hover:text-text'} ${!openNav && 'w-fit'}`}>
                            <Icon icon="pajamas:preferences" width="20" height="20" />
                            {openNav && (
                                <h4>Preferences</h4>
                            )} 
                        </div>

                        <div 
                            onClick={handleLogout}
                            className="flex items-center mt-20 w-full justify-center gap-3 border-1 border-accent p-1 rounded-[2px] cursor-pointer hover:bg-accent/50 hover:text-text active:bg-accent">
                            <Icon icon="material-symbols:logout-rounded" width="20" height="20" />
                            {openNav && (
                                <h4>Logout</h4>
                            )} 
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div>

                </div>
            </div>
        </div>
    )
}