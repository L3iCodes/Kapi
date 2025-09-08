import { createContext, useContext, useEffect, useState } from "react";

import useAuthAPI from "../hooks/useAuthAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({children}){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { loginMutation, refreshMutation, logoutMutation, signUpMutation } = useAuthAPI();

    // On mount, attempt to refresh token if possbile.
    useEffect(() => {
        if (!token) return

        refreshMutation.mutate(undefined, {
            onMutate: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setToken(data.access_token);
                setUser(data.user)
                setIsAuthenticated(true);
                setIsLoading(false);
            },
            onError: (error) => {
                localStorage.removeItem('token');
                setUser(null);
                setToken('');
                setIsAuthenticated(false);
            }
        });
    }, [token])

    const handleLogin = (credentials) => {
        loginMutation.mutate(credentials, {
            onMutate: () => {
                setIsLoading(true);
            },
            onSuccess: (data) => {
                setUser(data.result.user)
                setToken(data.result.token)
                setIsLoading(false);
                setIsAuthenticated(true);
                localStorage.setItem('token', data.result.token)
                navigate('/');
            }
        });
    };

    const handleLogout = () => {
        logoutMutation.mutate()
        localStorage.removeItem('token');
        setUser(null);
        setToken('');
        setIsAuthenticated(false);
    };

    return(
        <AuthContext.Provider value={{user, setUser, token, isAuthenticated, isLoading, handleLogin, loginMutation, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}