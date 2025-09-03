import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext()

export function NotificationProvider({children}){
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
        if(!notificationMessage) return;
         setShowNotification(true);

        const timer = setTimeout(() => {
            setShowNotification(false);
            setNotificationMessage(null);
        }, 2000)

        return () => {
            clearTimeout(timer);
        };
        
    }, [notificationMessage]);

    return(
        <NotificationContext.Provider value={{showNotification, setNotificationMessage, notificationMessage}}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotification(){
    return useContext(NotificationContext)
};