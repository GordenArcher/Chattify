import { useEffect, useRef, useState, useContext } from 'react';
import '../../assets/css/mainview.css';
import '../../assets/CSS/ch.css'
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import FriendInfo from '../../components/FriendInfo';
import { U } from '../../utils/hooks/FetchUsers';
import { AuthContext } from '../../utils/contexts/AuthContextProvider';
import { Load } from '../../components/Load';

export const MainViewChat = ({ 
  currentChatView, 
  setCurrentChatView, 
  typingIndicator, 
  websocketRef, 
  sendMessages, 
  mediaPreview, 
  setMediaPreview,
  setMediaMessage,
  messageChange,
  message,
  setMessage

 }) => {
  const [status, setStatus] = useState("")
  const [showPicker, setShowPicker] = useState(false);
  const [showFriendInfo, setShowFriendInfo] = useState(false);
  const [showOptions, setShowOptions] = useState(false)
  const {data, loading} = U(currentChatView)
  const [friendProfile, setFriendProfile] = useState({})
  const [searchChat, setSearchChat] = useState(false)
  const [searchChatInput, setSearchChatInput] = useState("")
  const messagesEndRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null)
  const [showMsgOpt, setShowMsgOpt] = useState(false)
  const { setMessages, messages } = useContext(AuthContext)

  useEffect(() => {
    setFriendProfile(data?.profile)

    if (data?.messages) {
      const sortedMessages = [...data.messages].sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
      setMessages(sortedMessages);
    }
    setStatus("Online")
  }, [data.profile, data.messages, setMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

    const handleMediaChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          setMediaMessage(file);
          
          const reader = new FileReader();
          reader.onloadend = () => {
            setMediaPreview(reader.result);  
          }
          reader.readAsDataURL(file); 
        }
      };

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  useEffect(() => {

    const closeEmogi = () => {
      setShowPicker(false)
      setShowOptions(false)
      setShowMsgOpt(false)
    } 

    document.addEventListener("click", closeEmogi)

    return () => {
      document.removeEventListener("click", closeEmogi)
    }
  }, [])

  const scrollBtn = useRef(null);
  const mainchatview = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom = mainchatview.current.scrollHeight - mainchatview.current.scrollTop - mainchatview.current.clientHeight < 1500;
      
      if (!atBottom) {
        scrollBtn.current.style.display = 'block';
      } else {
        scrollBtn.current.style.display = 'none';
      }
    };

    mainchatview.current.addEventListener("scroll", handleScroll);


  }, []);

  const scrollToBottom = () => {
    mainchatview.current.scrollTo({
      top: mainchatview.current.scrollHeight,
      behavior: 'smooth', 
    });
  };

  return (
    <>
   
    <div className="userchat">
      <div className="userchatcontainer" style={{position:'relative'}}>
      <div className="scrol_but" ref={scrollBtn} style={{ display: 'block' }}>
      <button onClick={scrollToBottom}>
        <i className="bi bi-arrow-down"></i>
      </button>
    </div>
        <div className="chatcontent">
          <div className="chathead">
            <div className="chat_banner">
              {searchChat ? (
                <div className="serach_chat">
                  <div className="search__c">
                    <div className="searc_friend_chat">
                      <div className="serach_in">
                        <input 
                        type="text"
                        id='chat-search'
                        value={searchChatInput}
                        onChange={(e) => setSearchChatInput(e.target.value)}
                        placeholder='Search for a specific text'
                        />

                      </div>
                    </div>

                    <div className="close_search">
                      <div className="cl_sea">
                        <button onClick={() => setSearchChat(false)}>
                          <i className='bi bi-x-circle'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h_banner">
                <div className="friend_banner_details">
                  <div className="banner_user_details">
                  <div className="h_banner_u" onClick={() => setShowFriendInfo(true)}>
                    <div className="banner_image_profile">
                      {friendProfile ? (
                          (friendProfile.profile?.profile_picture ? (
                              <div className='friendProfile fp'>
                                <img src={`http://localhost:8000${friendProfile.profile?.profile_picture}`} alt={`${friendProfile.username}'s profile`}/>
                              </div>
                            ) : (
                              
                              <div className='no_profile'>
                                {currentChatView[0].toUpperCase()}
                              </div>
                            ))
                      ) : (
                        <div className='no_profile'>
                          {currentChatView[0].toUpperCase()}
                        </div>
                      )}
                    
                      
                    </div>
                    <div className="h_user_details">
                      <div className="banner_username">
                          <div className="b_u_name">
                            <h4>{currentChatView}</h4>
                          </div>

                          <div className="online_status">
                            <div className="state">
                              {typingIndicator === currentChatView && 
                              <span>typing...</span>
                              }
                              
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="banner_del">
                    <div className="search_chat">
                      <div className="chat_s ud">
                        <button onClick={() => setSearchChat(true)}>
                          <span>
                            <i className='bi bi-search'></i>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="chat_user_actions">
                      <div className="actions_sh ud">
                        <button onClick={(e) => {
                          setShowOptions((currentOption) => !currentOption)
                          e.stopPropagation()}}>
                            <span>
                              <i className='bi bi-three-dots-vertical'></i>
                            </span>
                          </button>
                      </div>

                      {showOptions && 
                        <div className="banner_actions_children">
                          <div className="actions_children">
                            <ul>
                              <li onClick={() => setShowFriendInfo((currentState) => !currentState)}>
                                <div className='children_item'>
                                  <div className="view_friend_info bf">
                                    <p>Friend Info</p>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='children_item'>
                                  <div className="del_friend_chat bf">
                                    <p>Delete Chat</p>
                                  </div>
                                </div>
                              </li>
                              <li onClick={() => setCurrentChatView("")}>
                                <div className='children_item'>
                                  <div className="close_chat bf">
                                    <p>Close Chat</p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
              )}
              
            </div>
          </div>
          <div className="mainchatview" ref={mainchatview}>
            <div className="chatview">
              <div className="incoming">
                <div className="cm">
                  {loading ? (
                    <Load />
                  ) : (

                    (messages.map((msg) => {
                        const time = new Date(msg.sent_at)
                        const timestamp = `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
                        
                        return (
                          <div key={msg.id} className='inbox'>
                            {currentChatView !== msg.user ? (
                              <div className='sender msg'>
                                <div className="box">
                                  <div className="msg_wrap">
                                    <div className="msg_div">
                                      {msg.media ? (
                                        (msg.media.match(/\.(jpeg|jpg|png|svg|gif)$/i) ? (
                                          <img draggable='false' src={`http://localhost:8000${msg.media}`} alt=""  onClick={() => setPreviewImage(msg.media)}/>
                                        ) : (
                                          <video src={`http://localhost:8000${msg.media}`} controls></video>
                                          )
                                        )
                                      ) : (
                                        <span>{msg.message}</span>
                                      )}
                                      
                                    </div>
                                  </div>
  
                                  <div className="msg_t">
                                    <div className="msg_tst">
                                      <p>{timestamp}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className='reciever msg'>
                                <div className="box">
                                  <div className="msg_wrap">
                                    <div className="msg_div">
                                    {msg.media ? (
                                      (msg.media.match(/\.(jpeg|jpg|png|svg|gif)$/i) ? (
                                        <img draggable='false' src={`http://localhost:8000${msg.media}`} onClick={() => setPreviewImage(msg.media)}/>
                                      ) : (
                                        <video src={`http://localhost:8000${msg.media}`} controls></video>
                                        )
                                      )
                                    ) : (
                                        <span>{msg.message}</span>
                                      )}
                                    </div>
                                  </div>
  
                                  <div className="msg_t">
                                    <div className="msg_tst">
                                      <p>{timestamp}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                        
                      })
                    )
                  )}
                    
                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          <div className="chatinput">

              {mediaPreview && <div className="preview_media_image">
                <div className="preview">
                  <img src={mediaPreview} alt="message media" />
                </div>
              </div>}
              
              <div className="messagecontent">
                <div className="emoji">
                  <button 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    togglePicker();
                  }}>
                    <i className="bi bi-emoji-smile"></i>
                  </button>
                </div>
                <div className="attachFile">
                <input 
                type="file" 
                name='media'
                id="file" 
                onChange={handleMediaChange}
                hidden />

                  <label htmlFor="file">
                    <i className="bi bi-images"></i>
                  </label>
                </div>

                <div className="messagebox">
                  <div className="sendmessage">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      value={message}
                      placeholder="Send a Message"
                      onChange={(e) => messageChange(e)}
                    />
                  </div>

                    <div className="send">
                      <button ref={websocketRef} type="submit" onClick={sendMessages}>
                        <i className="bi bi-send"></i>
                      </button>
                    </div>
                </div>
              </div>
            </div>

            {showPicker && (
              <div style={{ position: "absolute", bottom: "100px", left: "450px" }} onClick={(e) => e.stopPropagation()}>
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
        </div>
      </div>
      {
        showFriendInfo &&
       <div className='side'>
          <FriendInfo messages={messages} previewImage={previewImage} setPreviewImage={setPreviewImage} f={friendProfile} setShowFriendInfo={setShowFriendInfo} loading={loading} />
       </div>
      }

  {previewImage && 
      <div className="preview_image_click">
          <div className="actions">
              <div className="download cls">
                  <a href="#" title="chattify image" download={`http://localhost:8000${previewImage}/`}>
                      <button role="button" aria-label="download" >
                          <i className="bi bi-download"></i>
                      </button>
                  </a>
              </div>

              <div className="close_ cls">
                  <button onClick={() => setPreviewImage(null)}>
                      <i className="bi bi-x"></i>
                  </button>
              </div>
          </div>
          <div className="pre_image">
            {previewImage.match(/\.(jpeg|jpg|png|svg|gif)$/i) ? (
              <img src={`http://localhost:8000${previewImage}/`} alt="image" />
            ) : (
              <video controls src={`http://localhost:8000${previewImage}/`}></video>
            )}
              
          </div>
      </div>
  }
      
    </div>
    </>
  );
};

MainViewChat.propTypes = {
  currentChatView: PropTypes.string.isRequired,  
  setCurrentChatView : PropTypes.func.isRequired,
  setIncomingMessage: PropTypes.func,
  typingIndicator: PropTypes.string,
  setTypingIndicator: PropTypes.func,
  websocketRef: PropTypes.object,
  sendMessages: PropTypes.func,
  mediaPreview: PropTypes.string,
  setMediaPreview: PropTypes.func,
  setMediaMessage: PropTypes.func,
  mediaMessage: PropTypes.string,
  setMessage: PropTypes.func,
  message: PropTypes.string,
  messageChange: PropTypes.func
}