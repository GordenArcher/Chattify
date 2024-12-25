import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContextProvider"

export const GetUserProfile = () => {

    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState({})
    const [usersDataDet, setusersDataDet] = useState("")
    const [error, setIsError] = useState("")
    const { token } = useContext(AuthContext)

    const url = "http://127.0.0.1:8000/api/get_profile/"
    useEffect(() => {
        
        const getProfile = async () => {
            setIsLoading(true)

            try {
                const response = await axios.get(url, {headers: {"Authorization":`Token ${token}`}})
                if (response.data.status === 'success') {
                    setusersData(response.data);
                    setusersDataDet(response.data.username)
                    setIsLoading(false)  
                }
                

            } catch (error) {
                console.log("error", error)
                setIsError("Error Retrieving users")
            }finally{
                setIsLoading(false)
            }

        }
        

        if(token){
            getProfile()
        }
        
    }, [token])


  return {user: usersData, loading, error, usersDataDet}
}
