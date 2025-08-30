import coffeeBeans from '../assets/CoffeeBeans.png'
import groundCoffee from '../assets/GroundCoffee.png'
import instantCoffee from '../assets/InstantCoffee.png'
import teaSelection from '../assets/tea.png'

export default function ProductCategory(){
    return(
        <div className="flex flex-col w-full gap-3">
            <div className="flex w-full gap-3 flex-wrap sm:flex-nowrap">
                <CategoryCard
                name={'Coffee Beans'}
                description={'Freshly roasted, whole beans for the perfect grind.'}
                className={'w-full sm:w-[40%]'}
                ><img src={coffeeBeans} className='absolute -bottom-10 left-0 sm:-bottom-0'/>
                </CategoryCard>

                <CategoryCard
                    name={'Ground Coffee'}
                    description={'Convenient and flavorful — ready to brew anytime.'}
                    className={'w-[calc(50%-6px)] sm:w-[30%]'}
                ><img src={groundCoffee} className='absolute -bottom-0'/>
                </CategoryCard>

                <CategoryCard
                    name={'Specialty Coffee'}
                    description={'Freshly roasted, whole beans for the perfect grind.'}
                    className={'w-[calc(50%-6px)] sm:w-[30%]'}
                >
                </CategoryCard>
            </div>

            <div className="flex w-full gap-3 flex-wrap sm:flex-nowrap">
                <CategoryCard
                    name={'Instant Coffee'}
                    description={'Quick, rich, and satisfying — just add hot water.”'}
                    className={'w-[calc(50%-6px)] sm:w-[30%]'}
                ><img src={instantCoffee} className='absolute h-[350px] -bottom-48 -right-10'/>
                </CategoryCard>

                <CategoryCard
                    name={'Accessories'}
                    description={'Mugs, brewers, and tools to elevate your coffee & tea rituals.'}
                    className={'w-[calc(50%-6px)] sm:w-[30%]'}
                >
                </CategoryCard>

                <CategoryCard
                    name={'Tea Selection'}
                    description={'Soothing teas from classic Earl Grey to calming herbal blends.'}
                    className={'w-full sm:w-[40%]'}
                    isTea={true}
                ><img src={teaSelection} className='absolute -bottom-30 -right-10 sm:-bottom-15 sm:-right-0'/>
                </CategoryCard>
            </div>
            
        </div>
    );
};

function CategoryCard({name, description, className, isTea = false, onClick, children}){
    return(
        <div className={`${className} flex flex-col bg-secondary h-[190px] p-3 rounded-[5px] overflow-hidden relative
                        transition-transform cursor-pointer
                        hover:scale-103 hover:bg-accent/30 active:bg-accent/50`}>
            {/* gradient overlay */}
            <div className={`absolute inset-0 ${isTea ? 'bg-gradient-tea' : 'bg-gradient'}`}/>

            <div className="z-10">
                <h2 className="font-semibold z-10">{name}</h2>
                <h4 className="text-subtext">{description}</h4>

                {children}
            </div>
        </div>
    );
};