import { useMutation, useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { updateUserAddressAPI, updateUserInfoAPI } from "../api/user.api";
import { useNotification } from "../context/NotificationContext";

export default function useUser(){
    const {setNotificationMessage} = useNotification()

    // Update user information
    const updateUserMutation =  useMutation({
        mutationFn: ({first_name, last_name, contact_number, email}) => updateUserInfoAPI(first_name, last_name, contact_number, email),
        onSuccess: () => {
            setNotificationMessage('User Information Updated')
        },
        onError: () => {
            setNotificationMessage('Failed to Update User Information')
        }
    })

    const updateAddressMutation =  useMutation({
        mutationFn: ({house_number, street, barangay, municipality_city, province, region, postal_code}) => updateUserAddressAPI(house_number, street, barangay, municipality_city, province, region, postal_code),
        onSuccess: () => {
            setNotificationMessage('User Address Updated')
        },
        onError: () => {
            setNotificationMessage('Failed to Update User Address')
        }
    })

    return({updateUserMutation, updateAddressMutation})
}