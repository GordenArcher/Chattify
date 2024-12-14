import ProfilePic from '../../assets/images/avatar-7.png'
import '../../assets/CSS/chatbox.css'
import PropType from 'prop-types'

export const Leftbox = ({ setCurrentChatView }) => {
  return (
    <div className="leftChatbox">
        <div className="leftchatboxwrap">
            <div className="leftchatheader">
                <div className="lefthead">
                    <h3>Chattify</h3>
                </div>

                <div className="leftsearchlist">
                    <div className="searchlistfriends">
                        <input type='text' id="search" name="search" placeholder="Search" />
                        <i className='bi bi-search'></i>
                    </div>
                </div>
            </div>

            <div className="listfriends">
                <div className="lists">
                    <div className="listswrap">
                        <div className="liscontainer">
                            <div className="friendProfile">
                                <img src={ProfilePic} alt="user profile" />
                            </div>

                            <div className="leftmessoverview">
                                <div className="over">
                                    <div className="friendname">
                                        <h3>Nii-Armar</h3>
                                    </div>

                                    <div className="messageOverview">
                                        <div className="vieww">
                                            <span>How you doing man</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="messTime">
                                    <div className="Timeset">
                                        <p>01 : 35</p>
                                    </div>

                                    <div className="messNum">
                                        <div className="numcount">
                                            <span>5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="liscontainer">
                            <div className="friendProfile">
                                <img src={ProfilePic} alt="user profile" />
                            </div>

                            <div className="leftmessoverview">
                                <div className="over">
                                    <div className="friendname">
                                        <h3>Nii-Armar</h3>
                                    </div>

                                    <div className="messageOverview">
                                        <div className="vieww">
                                            <span>How you doing man</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="messTime">
                                    <div className="Timeset">
                                        <p>01:35</p>
                                    </div>

                                    <div className="messNum">
                                        <div className="numcount">
                                            <span>5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="liscontainer">
                            <div className="friendProfile">
                                <img src={ProfilePic} alt="user profile" />
                            </div>

                            <div className="leftmessoverview">
                                <div className="over">
                                    <div className="friendname">
                                        <h3>Nii-Armar</h3>
                                    </div>

                                    <div className="messageOverview">
                                        <div className="vieww">
                                            <span>How you doing man</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="messTime">
                                    <div className="Timeset">
                                        <p>01 : 35</p>
                                    </div>

                                    <div className="messNum">
                                        <div className="numcount">
                                            <span>5</span>
                                        </div>
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

Leftbox.prototypes = {
    setCurrentChatView: PropType.bool.isRequired
}