import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContextProvider"
import api from "../axios"

export const GetUserProfile = () => {

    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState({})
    const [usersDataDet, setusersDataDet] = useState("")
    const [error, setIsError] = useState("")
    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        
        const getProfile = async () => {
            setIsLoading(true)

            try {
                const response = await api.get("/get_profile/")

                if(response){
                    const data = response.data
                    setusersData(data);
                    setusersDataDet(data.username)
                    setIsLoading(false)  
                }
                
            } catch (error) {
                console.log("error", error)
                const err = error.response.data
                setIsError(err || "Error Retrieving users")
            }finally{
                setIsLoading(false)
            }

        }
        

        if(isAuthenticated){
            getProfile()
        }
        
    }, [isAuthenticated])


  return {user: usersData, loading, error, usersDataDet}
}
