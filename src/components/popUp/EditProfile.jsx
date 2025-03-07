import PropTypes from "prop-types"
import { Load } from "../Load"
import UpdataProfile from "../../api/UpdataProfile"

const EditProfile = ({ setShowPopUPR, setProfilePreview, PreviewProfile, profilePreview, profileData, BASE_URL, setProfileData, PreviewCover  }) => {
    const { sendingProfile, setProfile } = UpdataProfile(profileData)
    
  return (
    <div className="sel_p_ima">
        <div className="c_pr_im">
            <div className="close_p_p">
                <button onClick={() => {
                setShowPopUPR(false)
                setProfilePreview(null)
                }}>
                    <i className="bi bi-x"></i>
                </button>
            </div>

            <div className="ch_imageee">
                <div className="choose_cover_image">  
                    <input 
                    type="file" 
                    name="cover_image"
                    hidden
                    id="choose-cover"
                    accept='image/*'
                    onChange={PreviewCover}
                    />
                    <label htmlFor="choose-cover">
                        <div className="choose_c">
                            <div className="image_cove">
                                {profileData.cover_picture ? (
                                    <img src={profilePreview ? profilePreview : `${BASE_URL}${profileData.cover_picture}`} alt="image preview" />   
                                    ) : (
                                    <div className="cover_picture" style={{color:"black"}}>No Cover Image</div>
                                )}
                            </div>
                        </div>
                    </label>
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
                            <div className="image_di">
                                {profileData.profile_picture ? (
                                    <img src={profilePreview ? profilePreview : `${BASE_URL}${profileData.profile_picture}`} alt="image preview" />   
                                ) : (
                                    <div>{profileData.username}</div>
                                )}
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="profile_content_">
                <div className="content_edit_pf">
                    <div className="edit_bio ed">
                        <label htmlFor="bio">Bio</label>
                        <textarea cols="15" rows="5" name="bio" id="bio" value={profileData.bio}
                        onChange={(e) => setProfileData((prevState) => ({...prevState, bio: e.target.value }))}
                        ></textarea>
                    </div>
                    <div className="edit_email ed">
                        <label htmlFor="email">Email</label>
                        <input required="" type="text" value={profileData.email} name="email" id="email" className="input" 
                        onChange={(e) => setProfileData((prevState) => ({...prevState, email: e.target.value }))}
                        />
                    </div>
                    <div className="edit_usrn ed">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={profileData.username} id="username"
                        onChange={(e) => setProfileData((prevState) => ({...prevState, username: e.target.value }))}
                         />
                    </div>
                </div>               
            </div>

            <div className="update_profile">
                <button onClick={setProfile} >{sendingProfile ? <Load /> : "Update"}</button>
            </div>
        </div>
    </div>
  )
}

EditProfile.propTypes = {
    setShowPopUPR: PropTypes.func,
    setProfilePreview: PropTypes.func,
    PreviewProfile: PropTypes.func,
    profilePreview: PropTypes.bool,
    PreviewCover: PropTypes.bool,
    isLoading: PropTypes.bool,
    setProfile: PropTypes.func,
    profileData: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        profile_picture: PropTypes.string,
        cover_picture: PropTypes.string,
        bio: PropTypes.string
    }),
    BASE_URL: PropTypes.string,
    setProfileData: PropTypes.func
}

export default EditProfile