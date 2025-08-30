export default function Filter({ className }){
    return(
        <div className={`${className} hidden sm:flex flex-col gap-5 p-2 border-1 border-accent rounded-[5px] w-[220px] h-fit`}>
            <h4 className="font-bold">Filters</h4>

            {/* Price Filter */}
            <div>
                <h4 className="font-medium">Price</h4>
                <select 
                    name="price" 
                    className="bg-secondary p-1.5 text-[12px] text-subtext rounded-[5px] cursor-pointer
                                border border-transparent hover:border-subtext w-full "
                    >
                        <option value="all">All</option>
                        <option value="$0 - $20">$0 - $20</option>
                        <option value="$21 - $40">$21 - $40</option>
                        <option value="$41 - $50">$41 - $50</option>
                        <option value="$50 >">$50 and above</option>
                </select>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col text-[12px]">
                <h4 className="font-medium">Categories</h4>
                <div className="ml-2 text-subtext">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="coffee beans" value='coffee beans'/> Coffee Beans
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="grounded coffee" value='grounded coffee'/> Grounded Coffee
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="specialty coffee" value='specialty coffee'/> Specialty Coffee
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="instant coffee" value='instant coffee'/> Instant Coffee
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="tea selection" value='tea selection'/> Tea Selection
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="accessories" value='accessories'/> Accessories
                    </label>
                </div>
            </div>

            <label className="flex items-center gap-2 text-[12px] text-subtext">
                <input type="checkbox" name="stock" value='stock'/> In Stock Only
            </label>
        </div>
    );
};