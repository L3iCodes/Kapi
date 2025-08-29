import beans from '../assets/Beans.png'
import mug from '../assets/CoffeeMug.png'

export default function Hero(){
    return(
        <div className='w-full flex h-[330px] p-5 relative overflow-hidden rounded-[5px]
                        bg-secondary items-center'>

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient"/>
            
            <div className='flex flex-col w-[60%] z-10'>
                <h1 className='font-bold leading-tight'>Your Daily Ritual, <br /> 
                    <span className='text-accent'>Perfected</span>
                </h1>
                <h4 className='text-subtext'>Discover premium coffee and tea that fit your lifestyle.</h4>
                <button className='mt-5 font-bold'> <h5>Browse Now</h5> </button>
            </div>

            <img 
                className='absolute h-[300px] -right-18 sm:block sm:right-0'
                src={mug} 
            />
            
            {/* Images */}
            <img 
                className='absolute -top-10 -left-10 h-[145px]'
                src={beans} 
            />
            <img 
                className='absolute -bottom-25 -right-10 h-[215px] sm:h-[245px]'
                src={beans} 
            />

        </div>
    )
}