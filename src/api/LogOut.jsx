import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../utils/contexts/AuthContextProvider"

const LogOut = () => {

    const BASE_URL = import.meta.env.VITE_API_URL
    const { setIsAuthenticated } = useContext(AuthContext)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logoutUser = async () => {
        setIsLoggingOut(true)
    
        try {
          const response = await fetch(`${BASE_URL}/auth/logout/`, {method:"POST", headers: {
            "Content-Type": "application/json",
          }, credentials:"include"}
        )
      
          if(response.ok){
            const data = await response.json()
            setIsAuthenticated(data.auth)
            toast.success(data.message)
            
          }else{
            const errordata = await response.json()
            toast.error(errordata.message)
          }
        } catch (error) {
          console.log(error)
        }finally{
          setIsLoggingOut(false)
        }
    
        
      }

  return {logoutUser, isLoggingOut}
}

export default LogOut