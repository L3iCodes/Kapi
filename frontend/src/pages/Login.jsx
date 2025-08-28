import { Icon } from '@iconify/react'
import mug from '../assets/CoffeeMug.png'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate()

    return(
        <div className="flex justify-center items-center h-full  sm:mt-3">
            <div className='flex flex-col w-[90%] min-h-[300px] sm:flex-row gap-5 bg-secondary rounded-[5px] border-accent border-1 shadow-sm shadow-black relative'>
                {/* gradient overlay */}
                <div class="absolute inset-0 bg-gradient"/>
                
                <div className='w-full p-5 z-10'>
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>Log in</h1>
                        <h4 className='text-subtext'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h4>
                    </div>
                </div>
                
                <form className='flex flex-col gap-5 w-full mt-auto mb-auto p-5 z-10'>
                    <div className='w-full text-[12px]'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='text' 
                            name='email' 
                            placeholder='Your email' 
                        />
                    </div>

                    <div className='w-full text-[12px]'>
                        <label htmlFor='email'>Password</label>
                        <input 
                            type='password' 
                            name='email' 
                            placeholder='Your password' 
                        />
                    </div>

                    <button className='!w-full mt-5'>Log In</button>
                    <Icon 
                        className='p-2 bg-text rounded-full self-center cursor-pointer hover:bg-secondary active:bg-text'
                        icon="devicon:google" 
                        width="40" 
                        height="40" 
                    />

                    <h6 className='self-center'>Don't have an account? 
                        <span 
                            onClick={() => navigate('/signup')}
                            className='ml-1 hover:text-accent cursor-pointer'
                            >Create Account
                        </span>
                    </h6>
                </form>

                <img src={mug} className='absolute h-[250px] -top-30 -right-10
                                          sm:top-auto sm:right-auto sm:-bottom-30 sm:-left-30 sm:h-[350px]' />
            </div>
        </div>
    )
}