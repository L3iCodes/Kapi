import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
    const navigate = useNavigate()
    const { user, handleLogout } = useAuth()

    return(
        <div className='h-[80px] w-full bg-secondary fixed bottom-0 left-0 border-[0.1px] border-accent rounded-[5px] z-100
                        sm:sticky sm:h-[50px] sm:top-0 sm:left-0'>
            {mobileNavigation()}
            {desktopNavigation(navigate, user, handleLogout)}
            
        </div>
    )
}

function mobileNavigation(){
    return(
        <ul className='flex items-center w-full h-full justify-center gap-5 text-subtext sm:hidden'>
            <li className='flex flex-col items-center'>
                <Icon icon="akar-icons:home-alt1" width="24" height="24" /> 
                <h5>Home</h5>
            </li>

            <li className='flex flex-col items-center'>
                <Icon icon="carbon:product" width="24" height="24" /> 
                <h5>Product</h5>
            </li>

            <li className='flex flex-col items-center'>
                <Icon icon="ix:about" width="24" height="24" /> 
                <h5>About</h5>
            </li>

            <li className='flex flex-col items-center'>
                <Icon icon="mdi:contact-outline" width="24" height="24" /> 
                <h5>Contact</h5>
            </li>

            <li className='flex flex-col items-center'>
                <Icon icon="mdi:cart-outline" width="24" height="24" /> 
                <h5>Cart</h5>
            </li>

            <li className='flex flex-col items-center'>
                <Icon icon="gg:profile" width="24" height="24" /> 
                <h5>Account</h5>
            </li>
        </ul>
    )
};

function desktopNavigation(navigate, user, handleLogout){
    return(
        <div className='hidden p-5 h-full w-full items-center sm:flex'>
            <h3 className='font-bold tracking-widest'>KAPI</h3>

            <ul className='flex items-center w-full h-full justify-center gap-5 text-subtext font-medium'>
                <li onClick={() => navigate('/')} className='flex flex-col items-center cursor-pointer hover:text-text active:text-secondary'>
                    <h5>Home</h5>
                </li>

                <li className='flex flex-col items-center cursor-pointer hover:text-text active:text-secondary'>
                    <h5>Product</h5>
                </li>

                <li className='flex flex-col items-center cursor-pointer hover:text-text active:text-secondary'>
                    <h5>About</h5>
                </li>

                <li className='flex flex-col items-center cursor-pointer hover:text-text active:text-secondary'>
                    <h5>Contact</h5>
                </li>
            </ul>

            <div className='flex items-center gap-3 text-subtext'>
                <Icon 
                    className={'cursor-pointer hover:text-text active:text-subtext'}
                    icon="material-symbols:search" 
                    width="15" 
                    height="15" 
                /> 

                {user
                    ? (
                    <>
                        <Icon 
                        className={'cursor-pointer hover:text-text active:text-subtext'}
                        icon="mdi:cart-outline" 
                        width="15" height="15" 
                        /> 

                        <Icon 
                            onClick={handleLogout}
                            className={'cursor-pointer hover:text-text active:text-subtext'}
                            icon="gg:profile" 
                            width="15" 
                            height="15" /> 
                    </>
                        
                    ):(
                        <h5 
                            onClick={() => navigate('/login')}
                            className='cursor-pointer hover:text-text active:text-subtext'>
                            Login
                        </h5>
                    )
                }

            </div>
        </div>
        
    )
}