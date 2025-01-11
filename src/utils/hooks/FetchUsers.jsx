import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContextProvider"

    const BASE_URL = "http://127.0.0.1:8000/"


export const U = (username) => {

    const [loading, setIsLoading] = useState(false)
    const [data, setdata] = useState([])
    const { token } = useContext(AuthContext)


    const url = `${BASE_URL}api/chat_messages/${username}`
    useEffect(() => {

        const getUserChatMessage = async () => {
            setIsLoading(true)

            try {
                const response = await axios.get(url, 
                    {"headers":{
                        "Authorization":`Token ${token}`
                        }
                    },
                    {withCredentials:true}
                )
    
                if(response.statusText === 'OK'){
                    setdata(response.data.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }finally{
                setIsLoading(false)
            }
            
        }

        getUserChatMessage()


    }, [token, url])

    return{data, loading}
}