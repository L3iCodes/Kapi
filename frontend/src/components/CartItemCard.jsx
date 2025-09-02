import { Icon } from "@iconify/react/dist/iconify.js";
import QuantityCounter from "./QuantityCounter";
import { useNavigate } from "react-router-dom";

export default function CartItemCard({ product }){
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/products/${product.product_id}`, {
        state: { product: product } //Store value in a state
    })}
    
    return(
        <div className="flex items-center border-1 gap-2 bg-primary rounded-[5px] border-accent p-2 ">
            <input type="checkbox" />
            <div onClick={handleNavigate} className='h-[60px] border-[0.5px] border-accent bg-secondary aspect-[3/4] rounded-[5px] overflow-hidden'>
                    <img className={'h-full w-full object-cover drop-shadow-xl'} src={product.img_url} />
            </div>
            
            <div className="grid grid-cols-3">
                <div>
                    <h4 onClick={handleNavigate} className="font-semibold cursor-pointer">{product.name}</h4>
                    <h5 className="font-bold text-accent">₱{product.price}<span className="font-medium text-subtext"> /pc</span></h5>
                </div>
                <QuantityCounter stock={product.stock} baseCount={product.quantity} className={'sm:flex-col flex-col-reverse'}/>
                <div className="flex flex-col m-auto">
                    <h4 className="font-medium text-subtext">Subtotal</h4>
                    <h3 className="font-bold text-accent">₱{(product.price * 2).toFixed(2)}</h3>
                </div>
            </div>

            <Icon 
                className="cursor-pointer hover:bg-red-600 rounded-[3px]"
                icon="material-symbols:delete-outline" 
                width="30" 
                height="30" 
            />
            
        </div>
    )
}