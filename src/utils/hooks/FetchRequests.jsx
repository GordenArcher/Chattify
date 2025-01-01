import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider'

export const FetchRequests = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [friends, setFriends] = useState([])
    const { token } = useContext(AuthContext)

    const BASE_URL = "http://127.0.0.1:8000/api/friends/"

    useEffect(() => {

        const getFriends = async () => {

            setIsLoading(true)
    
            try {
                const response = await axios.get(BASE_URL, {headers:{"Authorization":`Token ${token}`}})

                console.log(response)
                setFriends(response.data)
                
            } catch (error) {
                console.log(error)
                setError(true)
            }finally{
                setIsLoading(false)
            }
    
        }

        getFriends()

    }, [token, BASE_URL])

    
  return {user: friends, isLoading, error}
}
