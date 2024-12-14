import { useEffect, useState } from 'react';
import '../../assets/css/mainview.css';
import EmojiPicker from 'emoji-picker-react';

export const MainViewChat = () => {
  const [message, setMessage] = useState("")
  const [showPicker, setShowPicker] = useState(false);


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

                  {message && (
                    <div className="send">
                      <button type="submit">
                        <i className="bi bi-send"></i>
                      </button>
                    </div>
                  )}
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
