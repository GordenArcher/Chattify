import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContextProvider"
import { MessagesContext } from "../contexts/MessagesProvider"

    const BASE_URL = import.meta.env.VITE_API_URL


export const UserChatMessages = (username) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setdata] = useState([])
    const { isAuthenticated } = useContext(AuthContext)
    const { setLastMessage } = useContext(MessagesContext)


    const url = `${BASE_URL}/chat_messages/${username}/`
    useEffect(() => {

        const getUserChatMessage = async () => {
            setIsLoading(true)

            try {
                const response = await axios.get(url,{withCredentials:true})
    
                if(response.statusText === 'OK'){
                    setdata(response.data.data)
                    setLastMessage(response.data.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }finally{
                setIsLoading(false)
            }
            
        }

        if(isAuthenticated){
            getUserChatMessage()
        }
        


    }, [isAuthenticated, url, setLastMessage])

    return{data, isLoading}
}