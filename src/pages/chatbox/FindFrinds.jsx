import { useContext, useState } from "react"
import { SearchFriend } from "../../components/SearchFriend"
import { Lo } from "../../components/lo"
import { AuthContext } from "../../utils/contexts/AuthContextProvider"

const FindFrinds = () => {

  const {usersData, loading} = useContext(AuthContext)
  const [searchFriends, setSearchFriends] = useState("")

  return (
    <div className="find-friends">
      <div className="add_fiends">
        <div className="s_friends">
          <div className="leftchatheader">
            <div className="search_head">
              <h4>Find Friends</h4>
            </div>

            <div className="search_input">
                <div className="searc">
                  <input 
                  type="text" 
                  id="serach-friend" 
                  name="search" 
                  onChange={(e) => setSearchFriends(e.target.value)}
                  placeholder="Filter by username"  />
                  <i className="bi bi-person-fill-add"></i>
                </div>
              </div>

          </div>
          

          <div className="find_friends_wrap">
            <div className="find_friends_in">
              <div className="friends_display_all">
                <div className="users_fs">
                  <div className="all_users_search_wrap">
                    {loading ? (
                      <Lo />
                    ) : (
                      (
                        usersData.length > 0 ? (
                          
                          usersData.map((user) => {
                            const username = user.username.toLowerCase()
                            const search = searchFriends.toLowerCase();

                            const isMatch = !search || username.includes(search); 
                        
                            return(
                              <SearchFriend user={user} highlight={isMatch} key={user.id}/>
                            )
                          })
                        ) : (
                          <div></div>
                        )
                      )
                    )}
                    

                    {/* <div className="user_container">
                      <div className="user_cont">
                        <div className="user_conatiner_profile">
                          <div className="friendProfile">
                            <div className="profile_name">
                              {"Gorden".charAt(0).toUpperCase()}
                            </div>
                            
                          </div>

                          <div className="user_friend_name">
                            <h3 style={{fontWeight:'bold'}}>Gorden</h3>
                          </div>
                        </div>

                        <div className="user_friend_action">
                          <div className="user_friend_options">
                            <div className="options">
                              <div className="accept ch">
                                <button>
                                  <i className="bi bi-person-fill-check"></i>
                                  <span>Accept</span>
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
                    </div> */}
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

export default FindFrinds
