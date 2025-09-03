import { Icon } from "@iconify/react/dist/iconify.js";
import useCart from "../hooks/useCart";

export default function Modal( { children, onClose} ){
    return(
        <div onClick={onClose} className="fixed inset-0 h-full w-full flex justify-center items-center bg-secondary/10 backdrop-blur-[2px] z-100">
            <div onClick={(e) => e.stopPropagation()} className="min-w-[350px] max-w-[700px] bg-primary border-1 border-accent rounded-[5px]">
                <div className="flex flex-col gap-4 w-full h-full p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}