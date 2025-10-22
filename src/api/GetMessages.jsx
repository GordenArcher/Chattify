import axios from "axios"
import { useQuery } from "@tanstack/react-query"


const GetMessages = () => {

    const BASE_URL = import.meta.env.VITE_API_URL

    const getAllMessages = async () => {

        try {
            const response = await axios.get(`${BASE_URL}/get_messages`, {withCredentials:true})

            if(response.data){
                return response.data.chats
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const { isLoading, error, data } = useQuery({queryKey: ["chats"], queryFn: getAllMessages})

    
  return { data, isLoading, error}
}

export default GetMessages