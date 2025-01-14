import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider'

export const FetchRequests = () => {

    const { token, setIsLoadingFriends, setErrorFriend } = useContext(AuthContext)

    const BASE_URL = "http://127.0.0.1:8000/api/friends/"

    const [friends, setFriends] = useState([])

    useEffect(() => {

        const getFriends = async () => {

            setIsLoadingFriends(true)
    
            try {
                const response = await axios.get(BASE_URL, {headers:{"Authorization":`Token ${token}`}})

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

        getFriends()

    }, [token, BASE_URL, setErrorFriend, setIsLoadingFriends, setFriends])

    return {users: friends}
}


export const FetchRecievedRequest = () => {

    const [received, setReceived] = useState([])
    const { token, setReceivedLoading, setNotificationCount } = useContext(AuthContext)
    

    const BASE_URL = "http://127.0.0.1:8000/api/recieved_request/"

    useEffect(() => {

        const getRecieved = async () => {

            setReceivedLoading(true)
            try {
                const response = await axios.get(BASE_URL, {headers:{"Authorization":`Token ${token}`}})

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

        getRecieved()

    }, [token, BASE_URL, setReceivedLoading, setNotificationCount])

    
  return { received, setReceived }
}
