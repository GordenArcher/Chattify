import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContextProvider"

export const FetchUsers = () => {

    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState([])
    const [error, setIsError] = useState("")
    const { token } = useContext(AuthContext)

    const url = "http://127.0.0.1:8000/api/users/"
    useEffect(() => {
        
        const getAllUsers = async () => {
            setIsLoading(true)

            try {
                console.log(token)
                const response = await axios.get(url, {headers: {"Authorization":`Token ${token}`}})
                setusersData(response.data.data.users);
                setIsLoading(false)

            } catch (error) {
                console.log("error", error)
                setIsError("Error Retrieving users")
            }finally{
                setIsLoading(false)
            }

        }
        

        if(token){
            getAllUsers()
        }
        
    }, [token])


  return {usersData, loading, error}
}
