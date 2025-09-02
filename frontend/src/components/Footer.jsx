import { useLocation } from "react-router-dom";

export default function Footer(){
    const location = useLocation();
    const pathName = location.pathname;

    return(
        pathName != '/login' && pathName != '/signup' && (
            <footer className={`hidden mt-auto sm:flex w-full gap-3 items-center justify-between h-[115px] p-5 bg-secondary border-1 border-accent rounded-[5px]`}>
                
                {/* Socials */}
                <div className="flex flex-col">
                    <h3 className="font-bold tracking-widest">KAPI</h3>
                    <h5 className="text-subtext font-medium">Discover premium coffee and tea that fit your lifestyle.</h5>

                    <div className="flex gap-2 mt-1 text-subtext">
                        <h5 className="hover:text-text active:text-subtext cursor-pointer">Facebook</h5>
                        <h5 className="hover:text-text active:text-subtext cursor-pointer">Instagram</h5>
                        <h5 className="hover:text-text active:text-subtext cursor-pointer">Twitter</h5>
                    </div>
                </div>

                {/* Shop */}
                <div className="flex flex-col ">
                    <h5 className="text-subtext font-bold">Shop</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Coffee Beans</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Tea Selection</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Accessories</h5>
                </div>

                {/* Company */}
                <div className="flex flex-col">
                    <h5 className="text-subtext font-bold">Company</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">About Us</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Contact</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Profile</h5>
                </div>

                {/* Support */}
                <div className="flex flex-col">
                    <h5 className="text-subtext font-bold">Support</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">FAQ</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Shipping Info</h5>
                    <h5 className="text-subtext hover:text-text active:text-subtext cursor-pointer">Returns</h5>
                </div>
            </footer>
        )
    );
};