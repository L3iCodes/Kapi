import { useMemo, useState } from "react";
import Hero from "../components/Hero"
import ProductCarousel from "../components/ProductCarousel"
import ProductCategory from "../components/ProductCategory"
import { useProduct } from "../context/ProductContext";

export default function Home(){
    const { productList } = useProduct();

    // Prevent rerendering the Product Carousel if an action occured
    const featured = useMemo(() => {
        if (!productList) return []; // safe default
        return productList.filter(p => p.is_featured === 1);
    }, [productList]);

    return(
        <div className="flex flex-col gap-25">
            <Hero />
            <ProductCarousel products={featured}/>
            <ProductCategory />
        </div>
    );
};