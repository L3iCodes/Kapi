import { Icon } from '@iconify/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRef, useState } from 'react';

const navigateItems = [
    {label:'Home', navigate:'/', icon:'akar-icons:home-alt1'},
    {label:'Product', navigate:'/products', icon:'carbon:product'},
    {label:'About', navigate:'/about', icon:'ix:about'},
    {label:'Contact', navigate:'/contact', icon:'mdi:contact-outline'},
    {label:'Cart', navigate:'/cart', icon:'mdi:cart-outline'},
    {label:'Profile', navigate:'/profile', icon:'gg:profile'},
]


export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation()
    const { user } = useAuth();
    const currentPage = location.pathname;
    
    return(
        
        <div className='w-full bg-secondary sticky top-0 left-0 border-1 border-accent rounded-[5px] z-100 h-[50px]'>
            {mobileNavigation(navigate, user, currentPage)}
            {desktopNavigation(navigate, user, currentPage)}
            
        </div>
    );
};

function mobileNavigation(navigate, user, currentPage){
    const [openNav, setOpenNav] = useState(false)
    
    const startX = useRef(0); 
    const handleStart = (x) => (startX.current = x);
    const handleEnd = (x) => {
        const diffX = x - startX.current;
        if (diffX > 50 && openNav) setOpenNav(false); // swipe right → close
        if (diffX < -50 && !openNav) setOpenNav(true); // swipe left → open
    };

    return(
        <>
            <div className='flex p-5 h-full w-full items-center sm:hidden'>
                <h3 onClick={() => navigate('/')} className='font-bold tracking-widest cursor-pointer hover:text-accent active:text-text'>KAPI</h3>
                <Icon 
                    onClick={() => setOpenNav(true)}
                    className={'ml-auto cursor-pointer'} 
                    icon="icon-park-outline:hamburger-button" 
                    width="25" height="25" 
                />
            </div>

            <div className={`p-5 fixed h-full bg-secondary top-0  border-l-1 border-accent
                            transition-all ease-in-out duration-300 active:cursor-grab
                            ${!openNav ? 'w-[0px] -right-10' : 'w-[250px] right-0'}
                            `}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseUp={(e) => handleEnd(e.clientX)}
                            >

                <Icon 
                    onClick={() => setOpenNav(false)}
                    className={'cursor-pointer'} 
                    icon="mynaui:panel-right-close-solid" 
                    width="25" height="25" 
                />

                <ul className='flex flex-col  w-full h-full mt-30 gap-5 text-subtext '>
                    {navigateItems.map(item => (
                        <li 
                            key={item.label}
                            className={`flex gap-2 cursor-pointer hover:text-text active:text-secondary
                                        ${
                                            (item.navigate === '/' && currentPage === '/') ||
                                            (item.navigate !== '/' && currentPage.startsWith(item.navigate))
                                            ? 'font-bold text-text'
                                            : ''
                                        }`}
                            onClick={() => {navigate(item.navigate), setOpenNav(false)}} 
                            >
                                <Icon icon={item.icon} width="25" height="25" /> 
                                <h3>{item.label}</h3>
                        </li>
                    ))}
                    
                    {!user && (
                        <h3 
                            onClick={() => navigate('/login')}
                            className='bg-primary text-center p-1 cursor-pointer rounded-[5px] hover:text-text hover:bg-accent active:text-subtext active:bg-primary'>
                            Login
                        </h3>
                    )}
                </ul>
            </div>
        </>
    );
};



function desktopNavigation(navigate, user, currentPage){
    return(
        <div className='hidden p-5 h-full w-full items-center sm:flex'>
            <h3 onClick={() => navigate('/')} className='font-bold tracking-widest cursor-pointer hover:text-accent active:text-text'>KAPI</h3>

            <ul className='flex items-center w-full h-full justify-center gap-5 text-subtext font-medium'>
                {navigateItems.map(item => (
                    item.label !== 'Cart' && item.label !== 'Profile' && (
                        <li key={item.label} onClick={() => navigate(item.navigate)} className='flex flex-col items-center cursor-pointer hover:text-text active:text-secondary'>
                            <h5 
                                className={`${
                                            (item.navigate === '/' && currentPage === '/') ||
                                            (item.navigate !== '/' && currentPage.startsWith(item.navigate))
                                            ? 'font-bold text-text'
                                            : ''
                                        }`}
                                >{item.label}
                                
                            </h5>
                        </li>
                    )
                ))}
            </ul>

            <div className='flex items-center gap-3 text-subtext'>
                <Icon 
                    onClick={() => navigate('/cart')}
                    className={`cursor-pointer hover:text-text active:text-subtext ${currentPage.startsWith('/cart') && ('text-text')}`}
                    icon="mdi:cart-outline" 
                    width="15" height="15" 
                    /> 

                <Icon 
                    onClick={() => navigate('/profile/orders')}
                    className={`cursor-pointer hover:text-text active:text-subtext ${currentPage.startsWith('/profile') && ('text-text')}`}
                    icon="gg:profile" 
                    width="15" 
                    height="15" /> 

                {!user && (
                    <h5 
                        onClick={() => navigate('/login')}
                        className='cursor-pointer hover:text-text active:text-subtext'>
                        Login
                    </h5>
                )}
            </div>
        </div> 
    );
};