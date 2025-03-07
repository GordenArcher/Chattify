import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { GetUserProfile } from "../utils/hooks/GetProfile"

const UpdataProfile = ({ profileData }) => {

    const [sendingProfile, setSendingProfile] = useState(false)

    const BASE_URL = import.meta.env.VITE_API_URL

    const formData = new FormData()
    formData.append("username", profileData?.username)
    formData.append("email", profileData?.email)
    formData.append("bio", profileData?.bio)
    formData.append("profile_image", profileData?.profile_picture)
    formData.append("cover_image", profileData?.cover_picture)

    const setProfile = async () => {

        setSendingProfile(true)

        try {
            const  response = await axios.post(`${BASE_URL}/set_profile/`, {formData}, { withCredentials: true })
            if(response.data){
                toast.success(response.data.message)
                GetUserProfile()
               return response.data.data 
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            setSendingProfile(false)
        }
    }
  return {sendingProfile, setProfile}
}

export default UpdataProfile