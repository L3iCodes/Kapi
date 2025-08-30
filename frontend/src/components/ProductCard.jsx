import sampleImage from '../assets/SampleProduct.png'

export default function ProductCard({id, name, description, price, img_src}){
    return(
        <div 
            className='flex flex-col gap-1 w-[175px] rounded-[5px] cursor-pointer 
                      hover:bg-accent/10 active:bg-secondary
                        transition-transform
                        hover:scale-100 hover:z-20'>
                
                {/* Product Image */}
                <div className='h-[260px] border-[0.5px] border-accent bg-secondary aspect-[3/4] rounded-[5px]'>
                    <img className={'h-full w-full object-cover drop-shadow-xl'} src={sampleImage} />
                </div>
            
                {/* Product Information */}
                <div className='flex flex-col gap-1 px-1'>
                    <div >
                    <h4 className='font-medium truncate hover:text-accent cursor-pointer'>Ethiopian Yirgacheffe Beans</h4>
                    <h5 className='text-subtext'>Bright floral aroma, citrusy notes, light roast</h5>
                    </div>
                    
                    <h3 className='text-accent font-bold'>$150.00</h3>
                </div>
        </div>
    )
}