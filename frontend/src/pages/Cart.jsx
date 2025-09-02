import { useAuth } from "../context/AuthContext";
import useCart from "../hooks/useCart";
import CartItemCard from "../components/CartItemCard";

export default function Cart(){
    const {cartQuery} = useCart();

    return(
        <div className="flex flex-col gap-3 ">
            <div>
                <h2 className="font-bold">Your Cart</h2>
                <h3 className="text-subtext">Manage your purchase</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-col w-full sm:w-[90%] bg-secondary gap-2 border-1 border-subtext rounded-[5px] p-2">
                    {cartQuery.data && (
                        cartQuery.data.map(product => (
                            <CartItemCard key={product.user_item_id} product={product} />
                        ))
                    )}
                </div>

                <div className="flex w-full sm:w-[40%] relative">
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient"/>
                </div>
            </div>
        </div>
    );
};