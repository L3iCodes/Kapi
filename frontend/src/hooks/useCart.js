import { useMutation, useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { addToCartAPI, deleteFromCartAPI, getCartAPI } from "../api/cart.api";
import { useState } from "react";

export default function useCart(){
    const queryClient = useQueryClient();
    const [itemSelected, setItemSelected] = useState([])
    const deliveryCost = 65;
    const tax = 20;

    // Get all cart items
    const cartQuery = useQuery({
        queryKey: ['cart'],
        queryFn: getCartAPI
    });

    // Add item to cart
    const addCartMutation =  useMutation({
        mutationFn: ({productId, quantity}) => addToCartAPI(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    // delete item from cart
    const deleteItemutation =  useMutation({
        mutationFn: ({cart_id}) =>deleteFromCartAPI(cart_id),
        onMutate: (variable) => {
            console.log('IN MUTATION ID: ' + variable.cart_id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    })

    // create list of selected cart item
    const handleCartSelect = (e, value) => {
        setItemSelected(() => {
            if(e.target.checked){
                return [...itemSelected, value]
            };

            return itemSelected.filter(index => index !== value);
        });
    };

    // calculate total
    const calculateSelectedTotal = () => {
        if (!itemSelected.length || !cartQuery.data) return 0;
        
        return itemSelected.reduce((total, index) => {
            const item = cartQuery.data[index];
            return item ? total + (item.price * item.quantity) : total;
        }, 0);
    };

    const calculateTotal = () => {
        return calculateSelectedTotal() + tax + deliveryCost
    }

    return({ itemSelected, cartQuery, addCartMutation, deleteItemutation, handleCartSelect, calculateSelectedTotal, calculateTotal, deliveryCost, tax })
};