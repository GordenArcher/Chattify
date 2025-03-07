import { useEffect, useRef, useState } from "react"
import { GetUserProfile } from "../../utils/hooks/GetProfile"
import EditProfile from "../../components/popUp/EditProfile"

const Profile = () => {

  const { user, loading, usersDataDet } = GetUserProfile()
  const [profilePreview, setProfilePreview] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [showPopUPR, setShowPopUPR] = useState(false)
  const [setModalPosition] = useState({ x: 0, y: 0 });
  const point = useRef(null)
  const [profileData, setProfileData] = useState({
    bio: user?.profile?.bio,
    profile_picture : user.profile?.profile_picture,
    cover_picture : user.profile?.cover_picture,
    email: user?.email,
    username: user?.username
  })


  useEffect(() => {
    if (user) {
      setProfileData({
        bio: user.profile?.bio || "",
        profile_picture: user.profile?.profile_picture || "",
        cover_picture: user.profile?.cover_picture || "",
        email: user.email || "",
        username: user.username || ""
      });
    }
  }, [user]);

  const BASE_URL = import.meta.env.VITE_API_URL_STATIC

  const showChild = (e) => {
    setModalPosition({ x: e.clientX, y: e.clientY });
  }

  // <div
  //         className="modal"
  //         style={{
  //           top: `${modalPosition.y}px`,
  //           left: `${modalPosition.x}px`,
  //         }}
  //       ></div>

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

  const PreviewCover = (e) => {
    const file = e.target.files[0]

    setProfileData((currentState) => ({
      ...currentState, cover_picture: file
    }))

    if(file){
      const pr = new FileReader()
      pr.onloadend = () => {
        setCoverPreview(pr.result)
      }
      pr.readAsDataURL(file)
    }

  }

  const profilImage = profilePreview ? profilePreview : `${BASE_URL}${profileData.profile_picture}`
  const coverImage = coverPreview ? coverPreview : `${BASE_URL}${profileData.cover_picture}`

  return (
    <>
    <div className="Profile">
      <div className="user_profile">
        <div className="profile_wrap">
          {loading ? (
            "Loading...."
          ) : (
            <div className="user_profile_container">
              <div className="user_images">
                <div className="user_cover_image">
                  <div ref={point} className="cover_image" onClick={showChild}>
                    {profileData.cover_picture ? (
                        <img src={coverImage} alt="User" />
                      ) : (
                        <div className="no_cover">No Cover Image</div>
                      )}
                    </div>
                  </div>

                  <div className="user_profile_image">
                    <div className="profile_picture">
                      {profileData.profile_picture ? (
                        <img src={profilImage} alt="User" />
                      ) : (
                        <div className="no_profile i">{usersDataDet.charAt(0).toUpperCase()}</div>
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
                          <div className="u_bio rt">
                            <div className="user_bio_info h">
                              <span>Bio</span>
                              <h3>{profileData.bio ? profileData.bio : `Hello there, I'm ${usersDataDet}`}</h3>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="user_username_wrap">
                    <div className="user_name">
                        <div className="u_username rt">
                          <div className="s_usern h">
                            <span>Username</span>
                            <h3>{profileData.username}</h3>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="user-email">
                    <div className="s_us_email">
                        <div className="user_email rt">
                          <div className="_user_email h">
                            <span>Email</span>
                            <h3>{profileData.email ? profileData.email : (<div className="no_user_email"><span>No Email</span></div>)}</h3>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
          
        </div>
      </div>
    </div>
    {showPopUPR && (
      <EditProfile 
      setShowPopUPR={setShowPopUPR}
      setProfilePreview={setProfilePreview} 
      PreviewProfile={PreviewProfile} 
      PreviewCover={PreviewCover}
      profilePreview={profilePreview}
      profileData={profileData}
      BASE_URL={BASE_URL}
      setProfileData={setProfileData}
      />
    ) }
    </>
  )
}

export default Profile