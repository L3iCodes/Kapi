import ProductCard from "./ProductCard"

export default function ProductCarousel(){
    return(
        <div className="flex flex-col w-full gap-3 overflow-hidden">
            <h3 className="font-bold">Featured Products</h3>
            <div className="flex h-full w-full gap-3 overflow-y-hidden">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>   
        </div>
    );
};