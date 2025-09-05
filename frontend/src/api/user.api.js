import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function updateUserInfoAPI(first_name, last_name, contact_number, email){
    const token = localStorage.getItem("token");
    console.log('IN API ', first_name)

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/user/update_user`,
            {first_name, last_name, contact_number, email},
            {
                headers: {"Authorization": `Bearer ${token}`},
                withCredentials: true
            }
        );
        console.log(res)
        return res.data.result;
    }catch(error){
        console.log(error)
    };
};