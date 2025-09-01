import ProductCard from "./ProductCard"
import { memo } from "react";

function ProductCarousel( { name, products } ){

    return(
        <div className="flex flex-col w-full gap-3 overflow-hidden">
            <h3 className="font-bold">{name}</h3>
            <div className="flex h-full w-full gap-3 overflow-y-hidden">
                {products && products.map(product => (
                    <ProductCard 
                        key={product.product_id}
                        product={product}
                    />
                ))}
            </div>   
        </div>
    );
};

export default memo(ProductCarousel)