import { useState } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Product(){
    const productList = Array(20).fill(<ProductCard className={`!border-0`}/>)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    return(
        <div className="flex flex-col gap-3 ">
            <div>
                <h2 className="font-bold">Our Products</h2>
                <h3 className="text-subtext"># of products</h3>
            </div>
            
            <div className="flex gap-3 relative">
                {/* Filter */}
                <Filter className={`hidden sm:flex !sticky top-15 self-start`}/>

                {/* Filter, Search, and order */}
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex gap-2 items-center justify-center">
                        
                        {/* Filter for mobile */}
                        <div 
                            onClick={() => setIsFilterOpen(s => !s)}
                            className={`sm:hidden flex items-center h-full bg-secondary gap-2 px-2 rounded-[5px] cursor-pointer border-1
                                ${isFilterOpen ? 'text-text border-subtext' : 'text-subtext border-transparent'} hover:bg-accent/20 active:bg-secondary cursor-pointer`}
                            >
                                <Icon icon="uiw:filter" width="15" height="15"/>
                                <h5>Filter</h5>
                                {isFilterOpen && (<Filter className={`absolute bg-secondary top-11 left-0 z-100 drop-shadow-2xl shadow-2xl shadow-black`}/>)}
                        </div>

                        <Search />
                        <select 
                            ame="order" 
                            className="bg-secondary px-4 text-[12px] text-subtext rounded-[5px] cursor-pointer h-full w-[40%]
                                        border border-transparent hover:border-subtext"
                            >
                                <option value="name">Name</option>
                                <option value="highest_to_lowest">Price (highest to lowest)</option>
                                <option value="lowest_to_highest">Price (lowest to highest)</option>
                        </select>
                    </div>
                    

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-5">
                        {productList}
                    </div>
                </div>
            </div>
        </div>
    );
};