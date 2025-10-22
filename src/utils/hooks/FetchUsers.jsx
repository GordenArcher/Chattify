import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContextProvider"
import { MessagesContext } from "../contexts/MessagesProvider"
import api from "../axios"

export const UserChatMessages = (username) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setdata] = useState([])
    const { isAuthenticated } = useContext(AuthContext)
    const { setLastMessage } = useContext(MessagesContext)

    useEffect(() => {

        const getUserChatMessage = async () => {
            setIsLoading(true)

            try {
                const response = await api.get(`/chat_messages/${username}/`)
    
                if(response){
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
        


    }, [isAuthenticated, username, setLastMessage])

    return{data, isLoading}
}