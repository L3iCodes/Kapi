import { useMutation, useQuery } from '@tanstack/react-query'
import { login, refresh, logout } from '../api/auth.api.js'

export default function useAuthAPI(){
    
    const loginMutation = useMutation({
        mutationFn: ({email, password}) => login(email, password),
    })

    const refreshMutation = useMutation({
        mutationFn: refresh
    })

    const logoutMutation = useMutation({
        mutationFn: logout
    })

    return({loginMutation, refreshMutation, logoutMutation})
}