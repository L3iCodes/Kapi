import { useState } from "react";
import UseOrder from "../hooks/UseOrder";
import OrderCard from "./OrderCard";

export default function OrderHistory(){
    const { userOrderQuery } = UseOrder();
    const [previewItem, setPreviewItem] = useState(null)

    return(
        <div className="flex h-full w-full p-2">
            {/* Order List */}
            <div className="flex flex-col  gap-2 w-full h-full ">
                <div className="flex items-center gap-2 ">
                    <h3 className="font-bold text-accent">Order History</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 h-full">
                    
                    <div className="flex flex-col w-full h-full sm:w-[60%] sm:h-full gap-2 overflow-y-auto">
                        {userOrderQuery.data && (
                            userOrderQuery.data.map(order => (
                                <OrderCard 
                                    key={order.order_id}
                                    onPreview={() => setPreviewItem(order)}
                                    mainText={order.order_id}
                                    subText={`${order.items.length} Items`}
                                    date={order.order_date}
                                    total={order.total}
                                    status={order.status}
                                />
                            ))
                        )}
                    </div>
                    
                    <div className={`fixed bottom-25 right-5 flex flex-col  w-fit bg-secondary border-1 border-accent rounded-[5px] p-2 gap-3 shadow-xl  shadow-accent
                                    sm:w-[40%] sm:static sm:shadow-none
                                    transition-all ease-in duration-300
                                    ${previewItem ? 'opacity-100 h-fit' : 'opacity-0 h-0'}`}>
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
                                        <div key={item.product_id}>
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