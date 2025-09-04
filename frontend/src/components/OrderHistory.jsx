import { useState } from "react";
import UseOrder from "../hooks/UseOrder";

export default function OrderHistory(){
    const { userOrderQuery } = UseOrder();
    const [previewItem, setPreviewItem] = useState(null)

    return(
        <div className="flex h-full w-full p-2 gap-3">
            {/* Order List */}
            <div className="flex flex-col gap-2 w-full h-full ">
                <div className="flex items-center gap-2 ">
                    <h3 className="font-bold">Order History</h3>
                </div>

                <div className="flex gap-2 h-[650px]">
                    <div className="flex flex-col w-[60%] gap-2 h-full overflow-y-auto">
                        {userOrderQuery.data && (
                            userOrderQuery.data.map(order => (
                                <div 
                                    onClick={() => setPreviewItem(order)}
                                    key={order.order_id} 
                                    className="flex justify-between bg-secondary border-1 p-2 border-subtext rounded-[5px] cursor-pointer hover:bg-accent/10 active:bg-accent/50"
                                    >
                                        <div>
                                            <h5>Order #{order.order_id}</h5>
                                            <h6>{order.items.length} Items</h6>
                                            <h6 className="mt-3 text-subtext">{order.order_date}</h6>
                                        </div>
                                        <h5 className="font-bold text-accent">₱{order.total}</h5>
                                        <h5 className="border-1 border-accent px-2 h-fit w-fit rounded-[5px]">{order.status}</h5>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex flex-col h-fit w-[40%] bg-secondary border-1 border-accent rounded-[5px] p-2 gap-3">
                        <div className="flex justify-between">
                            <h4 className="font-bold">Order Preview</h4>
                            <h5 className="border-1 border-accent px-2 h-fit w-fit rounded-[5px]">{previewItem?.status}</h5>
                        </div>
                        
                        {previewItem && (
                            <>
                                <div className="mt-3">
                                    <h5 className="font-medium">Order no.</h5>
                                    <h5 className="text-subtext">Order #{previewItem?.order_id}</h5>
                                </div>
                                <div>
                                    <h5 className="font-medium">Date & Time</h5>
                                    <h5 className="text-subtext">Order #{previewItem?.order_date}</h5>
                                </div>
                                <hr className="my-2 text-accent"/>
                                <div>
                                    <h5 className="font-medium">Items:</h5>

                                    {previewItem?.items.map(item => (
                                        <div>
                                            <h5 className="text-subtext">{item.product_name}</h5>
                                            <h5 className="text-accent">₱{item.price} x {item.quantity}</h5>
                                        </div>
                                    ))}

                                    <h5 className="mt-4 text-subtext">Delivery: <span className="text-accent">₱{previewItem?.delivery}</span></h5>
                                    <h5 className="text-subtext">Tax: <span className="text-accent">₱{previewItem?.delivery}</span></h5>
                                </div>
                                <hr className="my-2 text-accent"/>

                                <h5 
                                    className="flex justify-between bg-primary border-1 border-accent p-2 rounded-[5px] font-bold"
                                    >
                                        Total: <span className="text-accent">₱{previewItem.total}</span>
                                </h5>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
    
}