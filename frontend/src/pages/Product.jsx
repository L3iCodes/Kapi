import { useState, useMemo, useCallback, useEffect } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Sort from "../components/Sort";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useProduct } from "../context/ProductContext";
import useFilter from "../hooks/useFilter";
import { useParams } from "react-router-dom";
import ProductCardLoadingList from "../components/ProductCardLoading";

export default function Product(){
    const params = useParams();
    const { productList, getProductQuery } = useProduct();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { filteredList, onFilter, onSort, onSearch, categories, setCategories, priceRange, setPriceRange } = useFilter(productList);

    // Set initial category selection (happens when user select a category in the home page)
    useEffect(() => {
        if(!productList || !params.category) return;
        const newCategory = params.category.split(',')
        setCategories(newCategory);
        onFilter(priceRange, newCategory)
    }, [onFilter, productList, params.category])

    const toggleFilter = useCallback(() => {
        setIsFilterOpen(s => !s);
    }, []);

    // Create product card array (rerender when filteredList is different)
    const productCards = useMemo(() => {
        return filteredList?.map(product => (
            <ProductCard 
                key={product.product_id}
                product={product}
            />
        ));
    }, [filteredList]);

    return(
        <div className="flex flex-col gap-3 ">
            <div>
                <h2 className="font-bold">Our Products</h2>
                <h3 className="text-subtext">{filteredList?.length} products</h3>
            </div>
            
            <div className="flex gap-3 relative">
                {/* Filter */}
                <Filter 
                    categories={categories}
                    setCategories={setCategories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
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
                                        categories={categories}
                                        setCategories={setCategories}
                                        priceRange={priceRange}
                                        setPriceRange={setPriceRange}
                                        onFilter={onFilter}
                                        className={`absolute bg-secondary top-11 left-0 z-100 drop-shadow-2xl shadow-2xl shadow-black`}
                                    />
                                )}
                        </div>

                        <Search onSearch={onSearch}/>
                        <Sort onSort={onSort} />
                    </div>
                    

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-5">
                        {getProductQuery?.isPending 
                            ? (<ProductCardLoadingList count={8} />)
                            : (productCards)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};