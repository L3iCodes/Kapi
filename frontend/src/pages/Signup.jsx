import { Icon } from '@iconify/react'
import mug from '../assets/CoffeeMug.png'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import useAuthAPI from "../hooks/useAuthAPI";
import { useNotification } from "../context/NotificationContext";

export default function Signup(){
    const navigate = useNavigate()
    const {setNotificationMessage} = useNotification();
    const {signUpMutation} = useAuthAPI();

    const handleSignUp = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newAccount = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
        }
        
        signUpMutation.mutate(newAccount, {
            onSuccess: () => {
                setNotificationMessage('Account Created');
                e.target.reset();
            }
        })
    }

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
                
                <form onSubmit={handleSignUp} className='flex flex-col gap-5 w-full mt-auto mb-auto p-5 z-10'>
                    <div className='flex w-full gap-2 text-[12px]'>
                        <div className='w-full'>
                            <label htmlFor='first_name'>First Name</label>
                            <input 
                                type='text' 
                                name='first_name' 
                                placeholder='Jane' 
                                className='w-full'
                                required={true}
                            />
                        </div>
                        
                        <div className='w-full'>
                            <label htmlFor='last_name'>Last Name</label>
                            <input 
                                type='text' 
                                name='last_name' 
                                placeholder='Doe' 
                                className='w-full'
                                required={true}
                            />
                        </div>
                    
                    </div>

                    <div className='w-full text-[12px]'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            name='email' 
                            placeholder='janedoe@gmail.com' 
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            className='w-full'
                            required={true}
                        />
                    </div>

                    <div className='w-full text-[12px]'>
                        <label htmlFor='email'>Password</label>
                        <input 
                            type='text' 
                            name='password' 
                            placeholder='Your password' 
                            className='w-full'
                            required={true}
                        />
                    </div>

                    {signUpMutation.isError && (
                        <h6 className='-mt-2 self-end'>{signUpMutation.error.message}</h6>
                    )}

                    <Button 
                        type={'submit'} 
                        disabled={signUpMutation.isPending ? true : false} 
                        className={`!w-full mt-5 ${signUpMutation.isPending && ('bg-secondary')}`}
                        >{signUpMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    </Button>

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