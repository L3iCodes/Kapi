import { useMutation, useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { getUserOrdersAPI } from "../api/order.api";

export default function UseOrder(){
    // Get user order list
    const userOrderQuery = useQuery({
        queryKey: ['user_orders'],
        queryFn: getUserOrdersAPI
    });
    
    
    return({userOrderQuery})
}