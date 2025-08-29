import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000'

export async function login(email, password){

    try{
        const res = await axios.post(
            `${BACKEND_URL}/api/auth/login`,
            {email, password},
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        );

        return res.data;
    }catch(error){
        throw new Error(error.response.data.message)
    }
}