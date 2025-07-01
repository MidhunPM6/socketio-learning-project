import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useLogin = () => {
    
    const queryClient = useQueryClient()
  

  return useMutation({
    mutationFn: async userData => {
      const response = await axios.post(
        'http://localhost:3001/api/login',
        userData
      )
      return response.data.data
    },
    onSuccess: data => {
     
      queryClient.setQueryData(['user'], data)
      localStorage.setItem('user', JSON.stringify(data))
    }
  })
}
