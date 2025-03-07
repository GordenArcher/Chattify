import axios from 'axios'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../utils/contexts/AuthContextProvider'


export const GetUsers = () => {

  const { isAuthenticated, setIsLoading, setusersData, setIsError } = useContext(AuthContext)
  const url = import.meta.env.VITE_API_URL

  useEffect(() => {
      
    const getAllUsers = async () => {
      setIsLoading(true)

      try {
          const response = await axios.get(`${url}/users/`, {withCredentials:true})
          setusersData(response.data.data.users)
          setIsLoading(false)

      } catch (error) {
          console.log("error", error)
          setIsError("Error Retrieving users")
      }finally{
          setIsLoading(false)
      }
    }

    if(isAuthenticated){
        getAllUsers()
    }
    
}, [isAuthenticated, url, setIsError, setIsLoading, setusersData])

  return
}