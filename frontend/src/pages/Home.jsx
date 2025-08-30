import Hero from "../components/Hero"
import ProductCarousel from "../components/ProductCarousel"
import ProductCategory from "../components/ProductCategory"

export default function Home(){

    return(
        <div className="flex flex-col gap-25">
            <Hero />
            <ProductCarousel />
            <ProductCategory />
        </div>
    );
};