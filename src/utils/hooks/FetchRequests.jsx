
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContextProvider'
import api from '../axios'

export const FetchRequests = () => {

    const { isAuthenticated, setIsLoadingFriends, setErrorFriend } = useContext(AuthContext)

    const [friends, setFriends] = useState([])

    useEffect(() => {

        const getFriends = async () => {

            setIsLoadingFriends(true)
    
            try {
                const response = await api.get("friends")

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

        

    }, [isAuthenticated, setErrorFriend, setIsLoadingFriends, setFriends])

    return { users: friends }
}


export const FetchRecievedRequest = () => {

    const [received, setReceived] = useState([])
    const { isAuthenticated, setReceivedLoading, setNotificationCount } = useContext(AuthContext)

    useEffect(() => {

        const getRecieved = async () => {

            setReceivedLoading(true)
            try {
                const response = await api.get("/recieved_request/")

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
        

    }, [isAuthenticated, setReceivedLoading, setNotificationCount])

    
  return { received, setReceived }
}
