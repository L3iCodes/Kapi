import { Icon } from '@iconify/react'
import mug from '../assets/CoffeeMug.png'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Signup(){
    const navigate = useNavigate()

    return(
        <div className="flex justify-center items-center inset-0 absolute">
            <div className='flex flex-col w-[90%] min-h-[300px] sm:flex-row gap-5 bg-secondary rounded-[5px] border-accent border-1 shadow-sm shadow-black relative'>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient"/>
                
                <div className='w-full p-5 z-10'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold leading-10'>Create an Account</h1>
                        <h4 className='text-subtext'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h4>
                    </div>
                </div>
                
                <form className='flex flex-col gap-5 w-full mt-auto mb-auto p-5 z-10'>
                    <div className='flex w-full gap-2 text-[12px]'>
                        <div className='w-full'>
                            <label htmlFor='first_name'>First Name</label>
                            <input 
                                type='text' 
                                name='first_name' 
                                placeholder='Jane' 
                                className='w-full'
                            />
                        </div>
                        
                        <div className='w-full'>
                            <label htmlFor='last_name'>First Name</label>
                            <input 
                                type='text' 
                                name='last_name' 
                                placeholder='Doe' 
                                className='w-full'
                            />
                        </div>
                    
                    </div>

                    <div className='w-full text-[12px]'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='password' 
                            name='email' 
                            placeholder='janedoe@gmail.com' 
                            className='w-full'
                        />
                    </div>

                    <div className='w-full text-[12px]'>
                        <label htmlFor='email'>Password</label>
                        <input 
                            type='password' 
                            name='email' 
                            placeholder='Your password' 
                            className='w-full'
                        />
                    </div>

                    <Button className='!w-full mt-5'>Create Account</Button>

                    <h6 className='self-center'>Already have an account? 
                        <span 
                            onClick={() => navigate('/login')}
                            className='ml-1 hover:text-accent cursor-pointer'
                            >Login
                        </span>
                    </h6>
                </form>

                <img src={mug} className='absolute h-[250px] -top-30 -right-10
                                          sm:top-auto sm:right-auto sm:-bottom-35 sm:-left-30 sm:h-[350px]' />
            </div>
        </div>
    )
}