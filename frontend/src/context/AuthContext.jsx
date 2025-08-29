import { createContext, useContext, useState } from "react";

import useAuthAPI from "../hooks/useAuthAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('')
    const { loginMutation } = useAuthAPI()

    const handleLogin = (credentials) => {
        loginMutation.mutate(credentials, {
            onSuccess: (data) => {
                setUser(data.result.user)
                setToken(data.result.token)
                localStorage.setItem('token', data.result.token)
                navigate('/');
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken('')
    };

    return(
        <AuthContext.Provider value={{user, token, handleLogin, loginMutation, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}