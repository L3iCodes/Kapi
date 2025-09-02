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
