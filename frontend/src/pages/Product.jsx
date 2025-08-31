import { useState, useMemo, useCallback } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Sort from "../components/Sort";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useProduct } from "../context/ProductContext";
import useFilter from "../hooks/useFilter";

export default function Product(){
    const { productList } = useProduct();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { filteredList, onFilter, onSort } = useFilter(productList);

    const toggleFilter = useCallback(() => {
        setIsFilterOpen(s => !s);
    }, [])
    
    // Create product card array (rerender when filteredList is different)
    const productCards = useMemo(() => {
        return filteredList?.map(product => (
            <ProductCard 
                key={product.product_id}
                id={product.product_id}
                name={product.name}
                description={product.description}
                price={product.price}
                img_src={product.img_url}
            />
        ));
    }, [filteredList]);

    return(
        <div className="flex flex-col gap-3 ">
            <div>
                <h2 className="font-bold">Our Products</h2>
                <h3 className="text-subtext"># of products</h3>
            </div>
            
            <div className="flex gap-3 relative">
                {/* Filter */}
                <Filter 
                    onFilter={onFilter}
                    className={`hidden sm:flex !sticky top-15 self-start`}
                />

                {/* Filter, Search, and order */}
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex gap-2 items-center justify-center">
                        
                        {/* Filter for mobile */}
                        <div 
                            onClick={toggleFilter}
                            className={`sm:hidden flex items-center h-full bg-secondary gap-2 px-2 rounded-[5px] cursor-pointer border-1
                                ${isFilterOpen ? 'text-text border-subtext' : 'text-subtext border-transparent'} hover:bg-accent/20 active:bg-secondary cursor-pointer`}
                            >
                                <Icon icon="uiw:filter" width="15" height="15"/>
                                <h5>Filter</h5>
                                {isFilterOpen && (
                                    <Filter 
                                        onFilter={onFilter}
                                        className={`absolute bg-secondary top-11 left-0 z-100 drop-shadow-2xl shadow-2xl shadow-black`}
                                    />
                                )}
                        </div>

                        <Search />
                        <Sort onSort={onSort} />
                    </div>
                    

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-5">
                        {productCards}
                    </div>
                </div>
            </div>
        </div>
    );
};