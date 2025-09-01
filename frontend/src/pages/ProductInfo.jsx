import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router-dom"
import Button from "../components/Button";
import useFilter from "../hooks/useFilter";
import ProductCarousel from "../components/ProductCarousel"
import { useProduct } from "../context/ProductContext";
import { useEffect, useState } from "react";

export default function ProductInfo(){
    const location = useLocation();
    const product = location.state?.product; //Retrieve product info in state
    const {productList} = useProduct();
    
    const {filteredList, onFilter} = useFilter(productList);
    const [numItem, setNumItem] = useState(1);

    useEffect(() => {
         if (productList && product?.category) {
            onFilter('0,20000', [product.category.toLowerCase()]);
        };
    }, [productList, onFilter]);

    return(
        <div className="flex flex-col w-full gap-20">
            
            <div className="flex flex-col sm:flex-row gap-2">
                {/* Product Info */}
                <div className="flex flex-col w-full gap-5 order-2 sm:order-1">
                    <div>
                        <h1 className="font-bold">{product.name}</h1>
                        <h1 className="font-bold text-accent">₱{product.price}</h1>
                    </div>
                    
                    <div>
                        <h4 className="font-medium under">Information:</h4>
                        <h5>{product.description}</h5>
                    </div>

                    {/* Stock Info */}
                    <div className="flex items-center gap-2 mt-auto">
                        {/* Item Counter */}
                        <div className="flex items-center">
                            <Icon 
                                onClick={() => numItem > 1 && setNumItem(s => s -= 1)}
                                className={'bg-secondary text-subtext rounded-[3px] cursor-pointer hover:bg-accent hover:text-text active:bg-secondary'} 
                                icon="ic:round-minus" 
                                width="24" 
                                height="24" 
                            />

                            <input 
                                type='text' 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Only allow numbers and limit to stock
                                    if (/^\d*$/.test(value)) { // Only digits
                                        const numValue = parseInt(value) || 0;
                                        if (numValue <= product.stock) {
                                            setNumItem(numValue);
                                        }
                                    }
                                }}
                                className="!w-[50px] !bg-primary !text-accent font-bold text-center !text-[15px]" 
                                value={numItem}
                            />
                            
                            <Icon 
                                onClick={() => numItem < product.stock && setNumItem(s => s += 1)}
                                className={'bg-secondary text-subtext rounded-[3px] cursor-pointer hover:bg-accent hover:text-text active:bg-secondary'} 
                                icon="ic:round-plus" 
                                width="24" 
                                height="24" 
                            />
                        </div>
                        <h5 className="text-subtext ">{product.stock} stocks remaining</h5>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-5">
                        <Button className={'!w-[50%] sm:!w-fit'}><h3>Buy Now</h3></Button>
                        <Button variant="secondary" className={'!w-[50%] sm:!w-fit'}><h3>Add to Cart</h3></Button>
                    </div>

                </div>

                {/* Product Image */}
                <div className="flex gap-3 w-full items-center order-1 sm:order-2">
                    <div className='h-[300px] border-[0.5px] border-accent bg-secondary aspect-[3/4] rounded-[5px] overflow-hidden'>
                        <img className={'h-full w-full object-cover drop-shadow-xl'} src={product.img_url} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-secondary w-[95px] h-[95px] border-1 border-accent rounded-[5px]"/>
                        <div className="bg-secondary w-[95px] h-[95px] border-1 border-accent rounded-[5px]"/>
                        <div className="bg-secondary w-[95px] h-[95px] border-1 border-accent rounded-[5px]"/>
                    </div>
                </div>
            </div>


            <ProductCarousel name={'You might also like'} products={filteredList}/>
        </div>
    )
}