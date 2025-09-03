import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCartAPI(){
    const token = localStorage.getItem("token");

    try{
        const res = await axios.get(
            `${BACKEND_URL}/api/cart/get_cart`,
            {
                headers: {"Authorization": `Bearer ${token}`},
                withCredentials: true
            }
        );
        return res.data.result;
    }catch(error){
        console.log(error)
    };
};

export async function addToCartAPI(productId, quantity){
    const token = localStorage.getItem("token");

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/cart/add_item`,
             { productId, quantity },
            {
                headers: {"Authorization": `Bearer ${token}`},

            }
        );
        return res.data.result;
    }catch(error){
        throw new Error(error.response.data.message)
    };
};

export async function deleteFromCartAPI(cart_id){
    const token = localStorage.getItem("token");

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/cart/delete_item`,
             { cart_id },
            {
                headers: {"Authorization": `Bearer ${token}`},
            }
        );
        return res.data.result;
    }catch(error){
        throw new Error(error.response.data.message)
    };
};

export async function updateItemQtyAPI(cart_id, quantity){
    const token = localStorage.getItem("token");

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/cart/update_qty`,
             { cart_id, quantity },
            {
                headers: {"Authorization": `Bearer ${token}`},
            }
        );
        return res.data.result;
    }catch(error){
        throw new Error(error.response.data.message)
    };
};
