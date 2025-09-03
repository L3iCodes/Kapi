import { useAuth } from "../context/AuthContext";
import useCart from "../hooks/useCart";
import CartItemCard from "../components/CartItemCard";
import Button from "../components/Button";
import { useMemo, useState } from "react";

export default function Cart(){
    const {
        cartQuery, 
        itemSelected, 
        handleCartSelect, 
        calculateSelectedTotal,  
        calculateTotal,
        tax, deliveryCost
    } = useCart();

    const ItemCards = useMemo(() => 
        cartQuery.data?.map((product, index) => (
            <CartItemCard
                key={product.user_item_id}
                index={index}
                product={product}
                onSelect={handleCartSelect}
            />
        ))
    );

    return(
        <div className="flex flex-col h-full gap-3 ">
            <div>
                <h2 className="font-bold">Your Cart</h2>
                <h3 className="text-subtext">Manage your purchase</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-col w-full sm:w-[90%] bg-secondary gap-2 border-1 border-subtext rounded-[5px] p-2">
                    {ItemCards}
                </div>

                <div className="flex flex-col w-full h-fit absolute bottom-25 left-0 sm:w-[40%] border-1 border-accent  rounded-[5px] p-2 sm:relative sm:bottom-0">
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient "/>
                    
                    <div className="flex flex-col z-10 gap-2 w-full">
                        <h3 className="font-bold">Order Summary</h3>
                        <div className="flex flex-col">
                            <h5>Promo Code</h5>
                            <div className="flex gap-2">
                                <input type='text' placeholder={'Enter Code'} className="w-full"/>
                                <Button variant="primary" className={'!px-2 !font-medium'}><h6>Apply</h6></Button>
                            </div>
                            {itemSelected.length > 0 && (
                                <>
                                    <hr className="my-4 text-accent"/>
                                        <div className="flex justify-between">
                                            <h5>{itemSelected.length} items</h5>
                                            <h5>{`₱${calculateSelectedTotal().toFixed(2)}`}</h5>
                                        </div>
                                        <div className="flex justify-between">
                                            <h5>Delivery Cost</h5>
                                            <h5>₱{deliveryCost.toFixed(2)}</h5>
                                        </div>
                                        <div className="flex justify-between">
                                            <h5>Tax</h5>
                                            <h5>₱{tax.toFixed(2)}</h5>
                                        </div>
                                    <hr className="mt-4 mb-1 text-accent"/>
                                    
                                    <div className="flex justify-between font-bold">
                                        <h5>Total</h5>
                                        <h5>₱{calculateTotal().toFixed(2)}</h5>
                                    </div>

                                    <Button className={'!mt-5 !w-full'}><h5>Proceed to Checkout</h5></Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};