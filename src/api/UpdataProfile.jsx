
import { useState } from "react"
import { toast } from "react-toastify"
import { GetUserProfile } from "../utils/hooks/GetProfile"
import api from "../utils/axios"

const UpdataProfile = ({ profileData }) => {

    const [sendingProfile, setSendingProfile] = useState(false)

    const formData = new FormData()
    formData.append("username", profileData?.username)
    formData.append("email", profileData?.email)
    formData.append("bio", profileData?.bio)
    formData.append("profile_image", profileData?.profile_picture)
    formData.append("cover_image", profileData?.cover_picture)

    const setProfile = async () => {

        setSendingProfile(true)

        try {
            const  response = await api.post(`/set_profile/`, {formData})

            if(response){
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