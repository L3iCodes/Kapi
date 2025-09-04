import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUserOrdersAPI(){
    const token = localStorage.getItem("token");
    console.log('GETTING ORDER')

    try{
        const res = await axios.get(
            `${BACKEND_URL}/api/order/get_orders`,
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