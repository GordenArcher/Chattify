import { useContext, useRef, useState } from "react"
import { Load } from "../../components/Load"
import { GetUserProfile } from "../../utils/hooks/GetProfile"
import { toast } from "react-toastify"
import { AuthContext } from "../../utils/contexts/AuthContextProvider"
import { UpdateEmail } from "../../api/UpdateData"

const Profile = () => {

  const { user, loading, usersDataDet } = GetUserProfile()
  console.log(user)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isIsLoading, setIsLoading] = useState(false)
  const [IsLoadingEmail, setIsLoadingEmail] = useState(false)
  const [IsLoadingProfile, setIsLoadingProfile] = useState(false)
  const [profilePreview, setProfilePreview] = useState(null)
  const [showPopUPR, setShowPopUPR] = useState(false)
  const [isError, setIsError] = useState(null)
  const { token } = useContext(AuthContext)
  const point = useRef(null)
  const [profileData, setProfileData] = useState({
    bio: user.payload?.bio,
    profile_picture : null,
    cover_picture : null,
    email: "",
    username: user.username 
  })

  const { setProfileEmail } = UpdateEmail(setIsLoadingEmail, profileData.email, setIsEditingEmail)

  const setProfile = async () => {

    if(!profileData.bio){
      return toast.error("You didn't enter any message as bio")
    }

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8000/api/set_profile/", {
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

  const setProfileprofileImage = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("profile_image", profileData.profile_picture)

    if(!profileData.profile_picture){
      return toast.error("Select an image as profile picture")
    }

    setIsLoadingProfile(true)
    try {
      const response = await fetch("http://localhost:8000/api/set_profile/", {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          "Authorization":`Token ${token}`
        },
        body: formData
      })
  
      if(response.ok){
        const data = await response.json()
        toast.success(data.message)
      }else{
        const errorData = await response.json()
        toast.error(errorData.message)
      }
    } catch (error) {
        return error
    }
    finally{
      setIsLoadingProfile(false)
    }
  }

  const showChild = (e) => {
    const x = e.screenX
    const y = e.screenY
    console.log(x,y)
  }

  const PreviewProfile = (e) => {
    const file = e.target.files[0]

    setProfileData((currentState) => ({
      ...currentState, profile_picture: file
    }))

    if(file){
      const pr = new FileReader()
      pr.onloadend = () => {
        setProfilePreview(pr.result)
      }
      pr.readAsDataURL(file)
    }

  }

  return (
    <>
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
                    
                      <div className="pop_sel_profile_ii">
                      <button onClick={() => setShowPopUPR(true)}>
                        <i className="bi bi-images"></i>
                      </button>
                    </div>
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
                                  <textarea 
                                  onChange={(e) => 
                                    setProfileData((currentState) => ({...currentState, bio: e.target.value}))
                                  } 
                                  name="bio" 
                                  id="bio" 
                                  aria-description="this the area for the user's to enter their bio" 
                                  aria-label="user's bio" 
                                  value={profileData.bio}></textarea>
                                </div>

                                <div className="set_bio_button op">
                                  <button className="canc" onClick={() => setIsEditing(false)}>Cancel</button>
                                  <button onClick={setProfile}>{isIsLoading ? <Load />: "Update"}</button>
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
                                <p>{profileData.bio}</p>
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
                              <input 
                              type="text" 
                              name="username" 
                              id="username" 
                              value={profileData.username} 
                              onChange={(e) => 
                              setIsEditingUsername(e.target.value)
                              } />
                            </div>

                            <div className="set_username_button op">
                              <button className="canc" onClick={() => setIsEditingUsername(false)}>Cancel</button>
                              <button>{isIsLoading ? <Load />: "Update"}</button>
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
                              <input 
                              type="text" 
                              name="email" 
                              id="email" 
                              value={profileData.email} 
                              onChange={(e) => setProfileData((currentState) => ({...currentState, email:e.target.value})) }/>
                            </div>

                            <div className="set_email_button op">
                              <button className="canc" onClick={() => setIsEditingEmail(false)}>Cancel</button>
                              <button onClick={setProfileEmail}>{IsLoadingEmail ? <Load />: "Update"}</button>
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
    {showPopUPR && (
      <div className="sel_p_ima">
        <div className="c_pr_im">
          <div className="close_p_p">
            <button onClick={() => {
              setShowPopUPR(false)
              setProfilePreview(null)
            }
              }>
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="choose_profile_image">  
            <input 
            type="file" 
            name="profile_image"
            hidden
            id="choose-profile"
            accept='image/*'
            onChange={PreviewProfile}
             />
             <label htmlFor="choose-profile">
              <div className="choose_palace">
                {profilePreview ? 
                <div className="image_di">
                  <img src={profilePreview} alt="image preview" /> 
                </div>
                : 
                  <div className="sel">
                    <div style={{display:"flex", alignItems:"center", height:"100%", fontSize:"1.2rem", fontWeight:"600", color:"black", justifyContent:"center"}}>Click to Select an Image</div>
                  </div>
                }
              </div>
             </label>
          </div>

          <div className="choose_options">
            <div className="update_profile_c">
              <button onClick={setProfileprofileImage}>{ IsLoadingProfile ? <Load /> : "Update" }</button>
            </div>
          </div>
        </div>
      </div>
    ) }
    </>
  )
}

export default Profile