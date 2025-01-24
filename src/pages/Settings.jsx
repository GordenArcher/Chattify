import { useContext, useState } from "react"
import { AuthContext } from "../utils/contexts/AuthContextProvider"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Load } from "../components/Load"

export const Settings = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const logoutUser = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/api/auth/logout/", {method:"POST", headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      }})
  
      if(response.ok){
        const data = await response.json()
        localStorage.removeItem("token")
        toast.success(data.message)
        setTimeout(() => {
          navigate('/')
        },3000)
        
        
      }else{
        const errordata = await response.json()
        console.log(errordata)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }

    
  }



  return (
    <div className='settings'>
        <h1>SETTINGS</h1>

        <button onClick={logoutUser}>{isLoading ? <Load /> : 'Logout'}</button>
    </div>
  )
}
