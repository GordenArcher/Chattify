import { useContext, useRef, useState } from "react"
import { Load } from "../../components/Load"
import { GetUserProfile } from "../../utils/hooks/GetProfile"
import { toast } from "react-toastify"
import { AuthContext } from "../../utils/contexts/AuthContextProvider"

const Profile = () => {

  const { user, loading, usersDataDet } = GetUserProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isIsLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const { token } = useContext(AuthContext)
  const point = useRef(null)
  const [profileData, setProfileData] = useState({
    bio: user.payload?.bio,
    profile_picture : null,
    cover_picture : null
  })

const formData = new FormData()
formData.append("bio", profileData.bio)

  const setProfile = async () => {

    if(!profileData.bio){
      return toast.error("You need to Enter some texts")
    }


    setIsLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/set_profile/", {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          "Authorization":`Token ${token}`
        },
        body: JSON.stringify({'bio':profileData.bio})
      })
  
      if(response.ok){
        const data = await response.json()
        toast.success(data.message)
        setIsLoading(false)
        setIsEditing(false)
      }else{
        const errorData = await response.json()
        toast.error(errorData.message)
        setIsLoading(false)
      }
    } catch (error) {
      setIsError(error)
      toast.error(isError)
    }
    finally{
      setIsLoading(false)
    }

  }

  const showChild = (e) => {
    const x = e.screenX
    const y = e.screenY
    console.log(x,y)
  }



  return (
    <div className="Profile">
      <div className="user_profile">
        <div className="profile_wrap">
          <div className="user_profile_container">
            <div className="user_images">
              <div className="user_cover_image">
                <div ref={point} className="cover_image" onClick={showChild}>
                  {loading ? 
                    (
                      "Loading......" 

                    )
                    : (
                      (user.profile?.cover_picture ? (
                      <img src={`http://localhost:8000${user.profile?.cover_picture}`} alt="User" />
                    ) : (
                      <div className="no_cover">No Cover Image</div>
                    ))
                    )}
                </div>
              </div>

                <div className="user_profile_image">
                  <div className="profile_picture">
                    {loading ? 
                    (
                      "Loading......" 

                    )
                    : (
                      (user.profile?.profile_picture ? (
                      <img src={`http://localhost:8000${user.profile?.profile_picture}`} alt="User" />
                    ) : (
                      <div className="no_profile i">{usersDataDet.charAt(0).toUpperCase()}</div>
                    ))
                    )}
                    
                  </div>
                </div>

            </div> 

            <div className="users_details">
              <div className="user_profile_details">
                <div className="use_del">
                  <div className="users_bio">
                    <div className="us_bio">
                      <div className="bio">
                        {isEditing ? (
                          <div className="bio_edit">
                            <div className="set_bio">
                              <div className="set_bio_cont">
                                <div className="set_bio_input">
                                  <textarea onChange={(e) => setProfileData((currentState) => ({...currentState, bio: e.target.value}))} name="bio" id="bio" aria-description="this the area for the user's to enter their bio" aria-label="user's bio" value={user.profile?.bio}></textarea>
                                </div>

                                <div className="set_bio_button op">
                                  <button className="canc" onClick={() => setIsEditing(false)}>Cancel</button>
                                  <button onClick={setProfile}>{isIsLoading ? <Load />: "Update Bio"}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="u_bio rt">
                            <div className="user_bio_info h">
                              {loading ? (
                                "Loading..."
                              ) : (
                                <>
                                <span>Bio</span>
                                <h3>{user.profile?.bio ? user.profile?.bio : `Hello there, I'm ${usersDataDet}`}</h3>
                                </>
                              )}
                            </div>


                            <div className="edit_b">
                              <button onClick={() => setIsEditing((currentEdit => !currentEdit))}>
                                <i className="bi bi-pencil"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="user_username_wrap">
                    <div className="user_name">
                      {isEditingUsername ? (
                        <div className="set_username">
                          <div className="se_us_name">
                            <div className="s_username_f">
                              <input type="text" name="username" id="username" value={user.username} onChange={(e) => setIsEditingUsername(e.target.value)} />
                            </div>

                            <div className="set_username_button op">
                              <button className="canc" onClick={() => setIsEditingUsername(false)}>Cancel</button>
                              <button>{isIsLoading ? <Load />: "Update Bio"}</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="u_username rt">
                          <div className="s_usern h">
                            <span>Username</span>
                            <h3>{user.username}</h3>
                          </div>

                          <div className="edit_b">
                            <button onClick={() => setIsEditingUsername((currentEdit => !currentEdit))}>
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </div>

                  <div className="user-email">
                    <div className="s_us_email">
                      {isEditingEmail ? (
                        <div className="set_email">
                          <div className="se_us_mail">
                            <div className="s_email_f">
                              <input type="text" name="email" id="email" value={user.email} onChange={(e) => setIsEditingEmail(e.target.value)} />
                            </div>

                            <div className="set_email_button op">
                              <button className="canc" onClick={() => setIsEditingEmail(false)}>Cancel</button>
                              <button>{isIsLoading ? <Load />: "Update Bio"}</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="user_email rt">
                          <div className="_user_email h">
                            <span>Email</span>
                            <h3>{user.email ? user.email : (<div className="no_user_email"><span>No Email</span></div>)}</h3>
                          </div>

                          <div className="edit_b">
                            <button onClick={() => setIsEditingEmail((currentEdit => !currentEdit))}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            </div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile