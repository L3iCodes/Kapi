import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

export default function Product(){
    const productList = Array(20).fill(<ProductCard className={`!border-0`}/>)

    return(
        <div className="flex flex-col gap-3 ">
            <div>
                <h2 className="font-bold">Our Products</h2>
                <h3 className="text-subtext"># of products</h3>
            </div>
            
            <div className="flex gap-3 relative">
                {/* Filter */}
                <Filter className={`!sticky top-15 self-start`}/>

                {/* Order Filter */}
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex gap-2">
                        <Search />
                        <select 
                            ame="order" 
                            className="bg-secondary px-4 text-[12px] text-subtext rounded-[5px] cursor-pointer
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