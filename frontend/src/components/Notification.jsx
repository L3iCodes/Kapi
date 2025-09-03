import { useNotification } from "../context/NotificationContext"

export default function Notification(){
    const {notificationMessage} = useNotification();
    
    return(
        <div className="h-fit w-fit p-2 px-5 bg-accent/30 border-1 border-accent rounded-[5px] fixed self-center top-20  z-1000">
            <h5>{notificationMessage}</h5>
        </div>
    )
}