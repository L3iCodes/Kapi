import { useQuery } from "@tanstack/react-query";
import { getCartAPI } from "../api/cart.api";

export default function useCart(){

    const cartQuery = useQuery({
        queryKey: ['cart'],
        queryFn: getCartAPI
    });

    return({ cartQuery })
};