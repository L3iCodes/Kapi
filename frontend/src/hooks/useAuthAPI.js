import { useMutation } from '@tanstack/react-query'
import { login } from '../api/auth.api.js'

export default function useAuthAPI(){
    
    const loginMutation = useMutation({
        mutationFn: ({email, password}) => login(email, password),
    })

    return({loginMutation})
}