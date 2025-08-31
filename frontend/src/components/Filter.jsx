import { useState } from "react";
import { memo } from "react";

function Filter({ className, onFilter }){
    const [categories, setCategories] = useState([]);
    const [priceRange, setPriceRange] = useState('0,20000');
    
    const handleCategoryChange = (category) => (e) => {
        let newCategories;
        if (e.target.checked) {
            newCategories = [...categories, category];
        } else {
            newCategories = categories.filter(c => c !== category);
        }
        setCategories(newCategories);

        onFilter(priceRange, newCategories)
    };

    return(
        <form 
            onClick={(e) => e.stopPropagation()}
            className={`${className} flex flex-col gap-5 p-2 border-1 border-subtext rounded-[5px] w-[220px] h-fit`}>
    
            <h4 className="font-bold">Filters</h4>

            {/* Price Filter */}
            <div>
                <h4 className="font-medium">Price</h4>
                <select
                    multiple={false}
                    name="price" 
                    className="bg-secondary p-1.5 text-[12px] text-subtext rounded-[5px] cursor-pointer
                                border border-transparent hover:border-subtext w-full "
                    value={priceRange}
                    onChange={(e) => {
                        setPriceRange(e.target.value)
                        onFilter(e.target.value, categories)
                    }}
                    >
                        <option value='0,20000'>All</option>
                        <option value='0,200'>0 - 200</option>
                        <option value='201,400'>201 - 400</option>
                        <option value='401,600'>401 - 600</option>
                        <option value='600,20000'>600 and above</option>
                </select>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col text-[12px]">
                <h4 className="font-medium">Categories</h4>
                <div className="ml-2 text-subtext">
                    {["coffee beans", "ground coffee", "specialty coffee", "instant coffee", "tea selection", "accessories"].map(cat => (
                        <label key={cat} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="categories"
                                checked={categories.includes(cat)}
                                value={cat}
                                onChange={handleCategoryChange(cat)}
                            /> 
                                {cat}
                        </label>
                    ))}
                </div>
            </div>

            <label className="flex items-center gap-2 text-[12px] text-subtext">
                <input type="checkbox" name="stock" value='in-stock'/> In Stock Only
            </label>
        </form>
    );
};



export default memo(Filter);