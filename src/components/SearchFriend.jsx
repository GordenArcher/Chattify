import PropTypes from "prop-types"
import { useState } from "react"
import { Load } from "./Load"
import { toast } from "react-toastify"
import api from "../utils/axios"


export const SearchFriend = ({user, highlight}) => {

    const [isLoading, setIsLoading] = useState(false)

    const SendRequest = async () => {
        try {
            setIsLoading(true)
            
            const response = await api.post(`/send_request/${user.username}/`)


            if(response){
                const data = await response.data
                toast.success(data.message)
            }

        } catch (error) {
            const errorData = await error.response.data
            toast.error(errorData.message || "Error sending request")
                
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className="user_container" style={{ display: highlight ? 'flex' : 'none' }}>
        <div className="user_cont">
        <div className="user_conatiner_profile">
            <div className="friendProfile">
            {user.profile.profile_picture ? (
                <img src={`http://localhost:8000${user.profile.profile_picture}`} alt={`${user.username}'s profile`} />
            ) : (
                <div className="profile_name ">
                {user.username.charAt(0).toUpperCase()}
            </div>
            )}
            
            </div>

            <div className="user_friend_name">
            <h3 style={{fontWeight:'bold'}}>{user.username}</h3>
            </div>
        </div>

        <div className="user_friend_action">
            <div className="user_friend_options">
            <div className="options">
                <div className="accept ch">
                <button onClick={SendRequest}>
                    {isLoading ? (
                        <Load />
                    ) : (
                        <>
                            <i className="bi bi-person-fill-check"></i>
                            <span>Request</span>
                        </>
                    )}
                    
                </button>
                </div>

                <div className="decline ch">
                <button>
                    <i className="bi bi-person-x"></i>
                    <span>Remove</span>
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

SearchFriend.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
        profile: PropTypes.shape({
            bio: PropTypes.string,
            profile_picture: PropTypes.string,
        })
    }),
    highlight: PropTypes.bool.isRequired
}