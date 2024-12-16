import { useEffect, useRef, useState } from 'react';
import '../../assets/css/mainview.css';
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';

export const MainViewChat = ({ currentChatView }) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [showPicker, setShowPicker] = useState(false);
  const websocket = useRef(null)

    const CHAT_BASE_URL = "localhost:8000"

    websocket.current = new WebSocket(`ws://${CHAT_BASE_URL}/ws/chat/${currentChatView}/`)

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
          <div className="chathead"></div>
          <div className="mainchatview">
            <div className="chatview">
              <div className="incoming">
                <div className="cm">
                  {messages.length > 0 ? (
                    (messages.map((msg, index) => {
                      return (
                        <div key={index}>{msg.message}</div>
                      )
                    }))
                  ) : (
                    <div>NONe</div>
                  )
                }
                
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
                      <button type="submit" onClick={sendMessages}>
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

MainViewChat.propType = {
  currentChatView: PropTypes.func.isRequired
}