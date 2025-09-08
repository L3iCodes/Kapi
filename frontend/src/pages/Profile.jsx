import { Icon } from "@iconify/react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import OrderHistory from "../components/OrderHistory";
import ProfileSetting from "../components/ProfileSetting";
import AddressSetting from "../components/AddressSettiing";
import { useNavigate, useParams } from "react-router-dom";

const NAV_ITEMS = [
    { id: "orders", label: "Orders", icon: "mdi:cart" },
    { id: "user", label: "Profile", icon: "iconamoon:profile-fill" },
    { id: "address", label: "Address", icon: "bitcoin-icons:address-book-filled" },
    { id: "preferences", label: "Preferences", icon: "pajamas:preferences" },
];

export default function Profile() {
    const navigate = useNavigate();
    const { tab } = useParams();
    const { user, handleLogout } = useAuth();
    const [openNav, setOpenNav] = useState(false);

    // Redirect to default tab if none is provided
    useEffect(() => {
        if (!tab) navigate("/profile/orders", { replace: true });
    }, [tab, navigate]);

    return (
        <div className="flex flex-col w-full h-full gap-3 overflow-hidden">
        <div>
            <h2 className="font-bold">Your Profile</h2>
            <h3 className="text-subtext">Personalize and view orders</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 h-full">
            <DesktopNav
                openNav={openNav}
                setOpenNav={setOpenNav}
                activeTab={tab}
                navigate={navigate}
                user={user}
                handleLogout={handleLogout}
            />
            <MobileNav
                activeTab={tab}
                navigate={navigate}
                handleLogout={handleLogout}
            />

            {/* Content */}
            {tab === "orders" && <OrderHistory />}
            {tab === "user" && <ProfileSetting />}
            {tab === "address" && <AddressSetting />}
            {/* TODO: Add Address + Preferences components */}
        </div>
        </div>
    );
    }

function MobileNav({ activeTab, navigate, handleLogout }) {
    return (
        <div className="sm:hidden flex w-full border-1 border-accent justify-between p-3 gap-2 rounded-[5px] text-subtext relative">
        <div className="absolute inset-0 bg-gradient" />

        {NAV_ITEMS.map(({ id, label, icon }) => (
            <div
                key={id}
                onClick={() => navigate(`/profile/${id}`)}
                className={`z-10 flex flex-col items-center p-1.5 rounded-[5px] cursor-pointer 
                    ${
                    activeTab === id
                        ? "text-text font-bold bg-secondary border-1 border-accent"
                        : "hover:bg-accent/50 active:bg-accent hover:text-text"
                    }`}
                >
                <Icon icon={icon} width="18" height="18" />
                <h6>{label}</h6>
            </div>
        ))}

        <div
            onClick={handleLogout}
            className="z-10 flex flex-col items-center justify-center border-1 border-accent p-1 rounded-[5px] cursor-pointer hover:bg-accent/50 hover:text-text active:bg-accent"
        >
            <Icon icon="material-symbols:logout-rounded" width="18" height="18" />
            <h6>Logout</h6>
        </div>
        </div>
    );
}

function DesktopNav({ openNav, setOpenNav, activeTab, navigate, user, handleLogout }) {
    return (
        <div
        className={`hidden sm:flex flex-col border-1 border-accent p-3 gap-2 rounded-[5px] relative
            transition-all ease-in-out duration-100 h-fit
            ${!openNav ? "w-[60px] items-center" : "w-[200px]"}`}
        >
            <div className="absolute inset-0 bg-gradient" />

            {/* User Info */}
            <div className="flex gap-2 items-center">
                <div
                    onClick={() => setOpenNav((s) => !s)}
                    className="flex w-[30px] h-[30px] bg-secondary rounded-full z-10"
                />
                {openNav && (
                <div className="z-10">
                    <h4 className="font-bold truncate">{user?.name}</h4>
                    <h5>{user?.email}</h5>
                </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex flex-col z-10 mt-5 text-subtext font-medium gap-2">
                {NAV_ITEMS.map(({ id, label, icon }) => (
                <div
                    key={id}
                    onClick={() => navigate(`/profile/${id}`)}
                    className={`flex items-center gap-3 p-1.5 rounded-[5px] cursor-pointer 
                    ${
                        activeTab === id
                        ? "text-text font-bold bg-secondary border-1 border-accent"
                        : "hover:bg-accent/50 active:bg-accent hover:text-text"
                    } ${!openNav && "w-fit"}`}
                >
                    <Icon icon={icon} width="20" height="20" />
                    {openNav && <h4>{label}</h4>}
                </div>
                ))}

                <div
                    onClick={handleLogout}
                    className="flex items-center mt-20 w-full justify-center gap-3 border-1 border-accent p-1 rounded-[5px] cursor-pointer hover:bg-accent/50 hover:text-text active:bg-accent"
                >
                    <Icon icon="material-symbols:logout-rounded" width="20" height="20" />
                    {openNav && <h4>Logout</h4>}
                </div>
            </div>
        </div>
    );
}
