import { useMutation, useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { addToCartAPI, checkoutAPI, deleteFromCartAPI, getCartAPI, updateItemQtyAPI } from "../api/cart.api";
import { useState } from "react";
import { data } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function useCart(){
    const queryClient = useQueryClient();
    const {setNotificationMessage} = useNotification()
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
            setNotificationMessage('Item Added to Cart')
        }
    })

    // delete item from cart
    const deleteItemutation =  useMutation({
        mutationFn: ({cart_id}) =>deleteFromCartAPI(cart_id),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    });

    // update item quantity
    const updateItemQtyMutation =  useMutation({
        mutationFn: ({cart_id, quantity}) =>updateItemQtyAPI(cart_id, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
        }
    });

    
    const checkoutMutation =  useMutation({
        mutationFn: checkoutAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart'])
            setNotificationMessage('Thank you for your purchase!')
        }
    });

    // create list of selected cart item
    const handleCartSelect = (e, value) => {
        setItemSelected((prev) => {
            if(e.target.checked){
                return [...prev, value]
            };

            return prev.filter(index => index !== value);
        });
    };

    // calculate subtotal for selected item
    const calculateSelectedTotal = () => {
        if (!itemSelected.length || !cartQuery.data) return 0;
     
        return itemSelected.reduce((total, index) => {
            const item = cartQuery.data[index];
            return item ? total + (item.price * item.quantity) : total;
        }, 0);
    };

    // calculate total
    const calculateTotal = () => {
        return calculateSelectedTotal() + tax + deliveryCost
    }

    return({ 
        itemSelected, 
        setItemSelected,
        cartQuery, 
        addCartMutation, 
        deleteItemutation, 
        updateItemQtyMutation, 
        checkoutMutation,
        handleCartSelect, 
        calculateSelectedTotal, 
        calculateTotal, 
        deliveryCost, 
        tax })
};