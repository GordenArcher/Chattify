import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContextProvider"

export const GetUserProfile = () => {

    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState({})
    const [usersDataDet, setusersDataDet] = useState("")
    const [error, setIsError] = useState("")
    const { isAuthenticated } = useContext(AuthContext)

    const BASE_URL = import.meta.env.VITE_API_URL
    const url = `${BASE_URL}/get_profile/`
    useEffect(() => {
        
        const getProfile = async () => {
            setIsLoading(true)

            try {
                const response = await fetch(url, {credentials:"include"})
                if(response.ok){
                    const data = await response.json()
                    setusersData(data);
                    setusersDataDet(data.username)
                    setIsLoading(false)  
                }else{
                    const err = await response.json()
                    console.log(err)
                }
                

            } catch (error) {
                console.log("error", error)
                setIsError("Error Retrieving users")
            }finally{
                setIsLoading(false)
            }

        }
        

        if(isAuthenticated){
            getProfile()
        }
        
    }, [isAuthenticated, url])


  return {user: usersData, loading, error, usersDataDet}
}
