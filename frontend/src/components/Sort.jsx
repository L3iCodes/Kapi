import { useState } from "react";

export default function Sort( { onSort } ){
    const [order, setOrder] = useState('name-az')
    
    return(
        <select 
            onChange={(e) => {
                setOrder(e.target.value);
                onSort(e.target.value)
            }}
            name="order" 
            value={order}
            className="bg-secondary px-4 text-[12px] text-subtext rounded-[5px] cursor-pointer h-full w-[40%]
                        border border-transparent hover:border-subtext"
            >
                <option value="name-az">Alphabetical (A-Z)</option>
                <option value="name-za">Alphabetical (Z-A)</option>
                <option value="price-hl">Price (highest to lowest)</option>
                <option value="price-lh">Price (lowest to highest)</option>
        </select>
    )
}