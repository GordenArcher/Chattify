import PropTypes from "prop-types"
import { useContext, useState } from "react"
import { Load } from "./Load"
import { AuthContext } from "../utils/contexts/AuthContextProvider"
import { toast } from "react-toastify"


export const SearchFriend = ({user, highlight}) => {

    const { token } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const BASE_URL = `http://localhost:8000/api/send_request/${user.id}/`

    const SendRequest = async () => {
        try {
            setIsLoading(true)
            
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${token}`
                }
            })


            if(response.ok){
                const data = await response.json()
                if(data.status === 'success'){
                    toast.success(data.message)
                    console.log(data)
                    
                }

            }
            else{

                const errorData = await response.json()
                if(errorData){
                    toast.error(errorData.message)
                }
                
            }

        } catch (error) {
            console.log(error)
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