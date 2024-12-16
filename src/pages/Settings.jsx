import { useContext } from "react"
import { AuthContext } from "../utils/contexts/AuthContextProvider"
import { useNavigate } from "react-router-dom"

export const Settings = () => {
  const { logout, token } = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutUser = async () => {

    const response = await fetch("http://127.0.0.1:8000/api/auth/logout/", {method:"POST", headers: {
      "Authorization": `Token ${token}`,
    }})

    if(response.ok){
      const data = await response.json()
      console.log(data)
      logout()
      navigate("/")
    }else{
      const errordata = await response.json()
      console.log(errordata)
    }

    
  }



  return (
    <div className='settings'>
        <h1>SETTINGS</h1>

        <button onClick={logoutUser}>Logout</button>
    </div>
  )
}
