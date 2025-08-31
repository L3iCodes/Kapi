import ProductCard from "./ProductCard"
import { memo } from "react";

function ProductCarousel( {products} ){
    console.log('Product Carousel Mounted');

    return(
        <div className="flex flex-col w-full gap-3 overflow-hidden">
            <h3 className="font-bold">Featured Products</h3>
            <div className="flex h-full w-full gap-3 overflow-y-hidden">
                {products && products.map(product => (
                    <ProductCard 
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        img_src={product.img_url}
                    />
                ))}
            </div>   
        </div>
    );
};

export default memo(ProductCarousel)