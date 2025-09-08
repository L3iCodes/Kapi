import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function QuantityCounter( {baseCount=1, stock, onStock, className} ){
    const [numItem, setNumItem] = useState(baseCount)
    
    return(
        <div className={`${className} flex items-center gap-2 mt-auto`}>
            <div className="flex items-center">
                <Icon 
                    onClick={() => {
                        if (numItem > 1) {
                            const newValue = numItem - 1;
                            setNumItem(newValue);
                            onStock(newValue); // Pass the new quantity back to parent
                        }
                    }}
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
                            if (numValue <= stock) {
                                setNumItem(numValue);
                            }
                        }
                    }}
                    className="!w-[40px] !bg-primary !text-accent font-bold text-center !text-[15px]" 
                    value={numItem}
                />
                
                <Icon 
                    onClick={() => {
                        if (numItem < stock) {
                            const newValue = numItem + 1;
                            setNumItem(newValue);
                            onStock(newValue); // Pass the new quantity back to parent
                        }
                    }}
                    className={'bg-secondary text-subtext rounded-[3px] cursor-pointer hover:bg-accent hover:text-text active:bg-secondary'} 
                    icon="ic:round-plus" 
                    width="24" 
                    height="24" 
                />
            </div>

            <h5 className="text-subtext">{stock>0 ? `${stock} stocks remaining`: 'Unavailable'} </h5>
        </div>
    )
}