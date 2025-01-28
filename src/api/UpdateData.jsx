import { useContext } from "react"
import { toast } from "react-toastify"
import { AuthContext } from "../utils/contexts/AuthContextProvider"


export const UpdateEmail = (setIsLoadingEmail, email, setIsEditingEmail) => {

    const { token } = useContext(AuthContext)

    const setProfileEmail = async () => {

        if(!email){
          return toast.error("You didn't enter any email")
        }
    
        setIsLoadingEmail(true)
        try {
          const response = await fetch("http://localhost:8000/api/set_profile/", {
            method: 'POST',
            headers: {
              "Content-Type":"application/json",
              "Authorization":`Token ${token}`
            },
            body: JSON.stringify({'email':email})
          })
      
          if(response.ok){
            const data = await response.json()
            toast.success(data.message)
            setIsLoadingEmail(false)
            setIsEditingEmail(false)
          }else{
            const errorData = await response.json()
            toast.error(errorData.message)
          }
        } catch (error) {
            return error
        }
        finally{
            setIsLoadingEmail(false)
        }
    
      }
  return {setProfileEmail}
}


