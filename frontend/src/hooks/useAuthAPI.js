import { useMutation, useQuery } from '@tanstack/react-query'
import { login, refresh, logout, create_account } from '../api/auth.api.js'

export default function useAuthAPI(){
    
    const loginMutation = useMutation({
        mutationFn: ({email, password}) => login(email, password),
    })

    const signUpMutation = useMutation({
        mutationFn: ({first_name, last_name, email, password}) => create_account(first_name, last_name, email, password),
    })

    const refreshMutation = useMutation({
        mutationFn: refresh
    })

    const logoutMutation = useMutation({
        mutationFn: logout
    })

    return({loginMutation, refreshMutation, logoutMutation, signUpMutation})
}