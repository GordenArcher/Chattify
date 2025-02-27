import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider'

export const FetchRequests = () => {

    const { isAuthenticated, setIsLoadingFriends, setErrorFriend } = useContext(AuthContext)

    const url = import.meta.env.VITE_API_URL
    const BASE_URL = `${url}api/friends/`

    const [friends, setFriends] = useState([])

    useEffect(() => {

        const getFriends = async () => {

            setIsLoadingFriends(true)
    
            try {
                const response = await axios.get(BASE_URL, {withCredentials:true})

                if(response){
                    setErrorFriend(false)
                  setFriends(response.data.data)  
                }
                
                
            } catch {
                setErrorFriend(true)
            }finally{
                setIsLoadingFriends(false)
            }
    
        }

        if(isAuthenticated){
           getFriends() 
        }

        

    }, [isAuthenticated, BASE_URL, setErrorFriend, setIsLoadingFriends, setFriends])

    return {users: friends}
}


export const FetchRecievedRequest = () => {

    const [received, setReceived] = useState([])
    const { isAuthenticated, setReceivedLoading, setNotificationCount } = useContext(AuthContext)
    
    const url = import.meta.env.VITE_API_URL
    const BASE_URL = `${url}api/recieved_request/`

    useEffect(() => {

        const getRecieved = async () => {

            setReceivedLoading(true)
            try {
                const response = await axios.get(BASE_URL, {withCredentials:true})

                if(response){
                    setReceived(response.data.data)
                    setNotificationCount(response.data.data.length)
                }
                
            } catch (error) {
                console.log(error)
            }finally{
                setReceivedLoading(false)
            }
    
        }

        if(isAuthenticated){
            getRecieved()
        }
        

    }, [isAuthenticated, BASE_URL, setReceivedLoading, setNotificationCount])

    
  return { received, setReceived }
}
