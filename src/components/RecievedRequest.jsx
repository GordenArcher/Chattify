import { useContext, useState } from "react"
import { Load } from "./Load"
import { AuthContext } from "../utils/contexts/AuthContextProvider"
import { toast } from "react-toastify"


const RecievedRequest = props => {
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useContext(AuthContext)

    const BASE_URL = `http://127.0.0.1:8000/api/accept-friend-request/${props.id}/`

    const acceptRequest = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        try {
            
            const response = await fetch(BASE_URL, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${token}`,
                }
            })
            if(response.ok){
                console.log(response)
                toast.success(response.message)
            }

        } catch {
            return false
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <>
        <div className="user_container" >
            <div className="user_cont">
                <div className="user_conatiner_profile">
                    <div className="friendProfile">
                    {props.from_user.profile.profile_picture ? (
                        <img src={`http://localhost:8000${props.from_user.profile.profile_picture}`} alt={`${props.username}'s profile`} />
                    ) : (
                        <div className="profile_name ">
                        {props.from_user.username.charAt(0).toUpperCase()}
                    </div>
                    )}
                    
                    </div>

                    <div className="user_friend_name">
                    <h3 style={{fontWeight:'bold'}}>{props.from_user.username}</h3>
                    </div>
                </div>

                <div className="user_friend_action">
                    <div className="user_friend_options">
                    <div className="options">
                        <div className="accept ch">
                        <button onClick={acceptRequest}>
                            {isLoading ? (
                                <Load />
                            ) : (
                                <>
                                    <i className="bi bi-person-fill-check"></i>
                                    <span>Accept</span>
                                </>
                            )}
                            
                        </button>
                        </div>

                        <div className="decline ch">
                        <button>
                            <i className="bi bi-person-x"></i>
                            <span>Decline</span>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RecievedRequest