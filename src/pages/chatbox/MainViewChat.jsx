import { useContext, useEffect, useRef, useState } from 'react';
import '../../assets/css/mainview.css';
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../utils/contexts/AuthContextProvider';

export const MainViewChat = ({ currentChatView, setCurrentChatView }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [showPicker, setShowPicker] = useState(false);
  const websocket = useRef(null)
  const { token } = useContext(AuthContext)
  const [showOptions, setShowOptions] = useState(false)

    const CHAT_BASE_URL = "localhost:8000"

    websocket.current = new WebSocket(`ws://${CHAT_BASE_URL}/ws/chat/${currentChatView}/?token=${token}`)

    websocket.current.onopen = () => {
      console.log("websockets opened")
    }

    websocket.current.onerror = (Error) => {
      console.log("error", Error)
    }

    websocket.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, data]);
        console.log("incoming message", data);
      } catch (error) {
        console.error("Error parsing message data", error);
      }
    }

    websocket.current.onclose = () => {
      console.log("Websocket closed")
    }
    

    const sendMessages = () => {
      websocket.current.send(JSON.stringify({ message: message}))
      setMessage("")
    }

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowPicker(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="userchat">
      <div className="userchatcontainer">
        <div className="chatcontent">
          <div className="chathead">
            <div className="chat_banner">
              <div className="h_banner">
                <div className="friend_banner_details">
                  <div className="banner_user_details">
                  <div className="h_banner_u">
                    <div className="banner_image_profile">
                      <div className='no_profile'>
                        {currentChatView.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="h_user_details">
                      <div className="banner_username">
                          <div className="b_u_name">
                            <h4>{currentChatView}</h4>
                          </div>

                          <div className="online_status">
                            <div className="state">
                              <span>online</span>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="banner_del">
                    <div className="search_chat">
                      <div className="chat_s ud">
                        <button>
                          <span>
                            <i className='bi bi-search'></i>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="chat_user_actions">
                      <div className="actions ud">
                        <button onClick={() => setShowOptions((currentOption) => !currentOption)}>
                            <span>
                              <i className='bi bi-three-dots-vertical'></i>
                            </span>
                          </button>
                      </div>

                      {showOptions && 
                        <div className="banner_actions_children">
                          <div className="actions_children">
                            <ul>
                              <li>
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
            </div>
          </div>
          <div className="mainchatview">
            <div className="chatview">
              <div className="incoming">
                <div className="cm">
                    {messages.map((msg, index) => {
                      return (
                        <div key={index}>{msg.message}</div>
                      )
                    })}
                
                </div>
              </div>
            </div>
            <div className="chatinput">
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
                <input type="file" name='media' id="file" hidden />
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
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </div>

                    <div className="send">
                      <button ref={websocket} type="submit" onClick={sendMessages}>
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
      </div>
    </div>
  );
};

MainViewChat.propTypes = {
  currentChatView: PropTypes.string.isRequired,  
  setCurrentChatView : PropTypes.string.isRequired, 
}