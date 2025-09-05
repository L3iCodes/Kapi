export default function OrderCard({mainText, subText, date, total, status, onPreview }){
    return(
        <div 
            onClick={onPreview}
            className="flex justify-between bg-secondary border-1 p-2 border-subtext rounded-[5px] cursor-pointer hover:bg-accent/10 active:bg-accent/50"
            >
                <div>
                    <h5>Order #{mainText}</h5>
                    <h6>{subText}</h6>
                    <h6 className="mt-3 text-subtext">{date}</h6>
                </div>
                <h5 className="font-bold text-accent">₱{total}</h5>
                <h5 className="border-1 border-accent px-2 h-fit w-fit rounded-[5px]">{status}</h5>
        </div>
    )
}