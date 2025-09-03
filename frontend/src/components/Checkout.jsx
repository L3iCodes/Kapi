import { Icon } from "@iconify/react/dist/iconify.js"
import useCart from "../hooks/useCart";
import Button from "./Button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";


export default function Checkout({ list, selectedItems=null, onSuccess }){ 
    const { checkoutMutation, cartQuery, deleteItemutation } = useCart()
    const { user } = useAuth();
    console.log(user)
    
    const handleCheckout = useMutation({
        mutationFn: checkoutMutation.mutateAsync, // Use the original checkout function
        onSuccess: () => {

            // Delete cart items after successful checkout
            if (selectedItems && cartQuery.data) {
                selectedItems.forEach(itemIndex => {
                    const cartItem = cartQuery.data[itemIndex];
                    if (cartItem) {
                        deleteItemutation.mutate({
                            cart_id: cartItem.user_item_id
                        });
                    }
                });
            }
            onSuccess();
        },
        onError: (error) => {
            toast.error('Failed to place order');
        }
    });
    
    return(
        <>
        <div>
            <h2 className="font-bold">Checkout</h2>
            <h4 className="text-subtext">Proceed to order</h4>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Customer Information */}
            <div className="flex flex-col border-1 border-accent w-full h-fit sm:w-[40%] p-2 text-subtext rounded-[5px] gap-5">
                <div className="flex gap-2">
                    <Icon className={'text-text'} icon="iconamoon:profile-fill" width="23" height="23" />
                    <div>
                        <h4 className="text-text font-bold">Customer Information</h4>
                        <h4 className="font-medium">{user.name}</h4>
                        <h5>{user.email}</h5>
                        <h5>0961 365 5723</h5>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Icon className={'text-text'} icon="bitcoin-icons:address-book-filled" width="23" height="23" />
                    <div>
                        <h4 className="text-text font-bold">Shipping Address</h4>
                        <h5>Rayala St., Iraya Sur, Oas Albay</h5>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Icon className={'text-text'} icon="fluent:payment-20-filled" width="23" height="23" />
                    <div>
                        <h4 className="text-text font-bold">Payment Information</h4>
                        <h5>Cash on Delivery</h5>
                        <h5>Credit or Debit Card</h5>
                    </div>
                </div>
            </div>

            {/* Checkout Summary */}
            <div className="flex flex-col w-full sm:w-[60%] gap-2">
                <h3 className="font-bold"> {list.items?.length} Items</h3>

                {list && (
                    list.items.map(product => (
                        <div key={'key_' + product.user_item_id} className="flex gap-2 items-center">
                            <div className='h-[60px] border-[0.5px] border-accent bg-secondary aspect-[3/4] rounded-[5px] overflow-hidden'>
                                <img className={'h-full w-full object-cover drop-shadow-xl'} src={product.img_url} />
                            </div>
                            <div>
                                <h4 className="font-bold">{product.name}</h4>
                                <h4 className="font-bold text-accent">{product.price} x {product.quantity}</h4>
                            </div>
                            <h4 className="ml-auto">₱
                                {product.price * product.quantity}
                            </h4>
                        </div>
                    )
                ))}
                
                <div>
                    <div className="flex justify-between">
                        <h5>{list.items.length} items</h5>
                        <h5>{`₱${list.subtotal}`}</h5>
                    </div>
                    <div className="flex justify-between">
                        <h5>Delivery Cost</h5>
                        <h5>₱{list.deliveryCost}</h5>
                    </div>
                    <div className="flex justify-between">
                        <h5>Tax</h5>
                        <h5>₱{list.tax}</h5>
                    </div>
                </div>
                <hr className="my-1 text-accent"/>
                <div className="flex justify-between font-bold">
                    <h5>Total</h5>
                    <h5>₱{list.total}</h5>
                </div>

                <Button 
                    onClick={() => handleCheckout.mutate(list)}
                    variant="primary" 
                    className={'self-end mt-auto'}
                    >
                        <h5>Place Order</h5>
                </Button>
            </div>
        </div>
        </>
    )
}