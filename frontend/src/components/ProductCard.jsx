export default function ProductCard({id, name, description, price, img_src, className}){
    return(
        <div 
            onClick={() => alert('Product ID: ' + id)}
            className={`${className} flex flex-col gap-1  rounded-[5px] cursor-pointer 
                      hover:bg-accent/10 active:bg-secondary
                        transition-transform
                        hover:scale-100 hover:z-20`}>
                
                {/* Product Image */}
                <div className='h-[260px] border-[0.5px] border-accent bg-secondary aspect-[3/4] rounded-[5px] overflow-hidden'>
                    <img className={'h-full w-full object-cover drop-shadow-xl'} src={img_src} />
                </div>
            
                {/* Product Information */}
                <div className='flex flex-col gap-1 px-1'>
                    <div>
                        <h4 className='font-medium truncate hover:text-accent cursor-pointer'>{name}</h4>
                        <h5 className='text-subtext'>{description}</h5>
                    </div>
                    
                    <h3 className='text-accent font-bold'>{price}</h3>
                </div>
        </div>
    );
};