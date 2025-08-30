import { createContext, useContext, useEffect, useState } from "react";

import useAuthAPI from "../hooks/useAuthAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const { loginMutation, refreshMutation, logoutMutation } = useAuthAPI()

    // On mount, attempt to refresh token if possbile.
    useEffect(() => {
        if (!token) return

        refreshMutation.mutate(undefined, {
            onSuccess: (data) => {
                console.log(data)
                setToken(data.access_token);
                setUser(data.user)
            },
        })
    }, [token])

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
        logoutMutation.mutate()
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