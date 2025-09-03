import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function get_products_api(){

    try{
        const res = await axios.get(
            `${BACKEND_URL}/api/product/get_all`
        );
        return res.data.result;
    }catch(error){
        throw new Error(error.response.data.message)
    };
};

