import { useState } from "react"
import { Leftbox } from "./Leftbox"
import { MainViewChat } from "./MainViewChat"
import '../../assets/CSS/chatbox.css'
import { LeftTab } from "../../components/LeftTab"
import { Settings } from "../Settings"
import FindFrinds from "./FindFrinds"
import Profile from "./Profile"
import Selected from "../../components/!Selected"
import Notification from "./Notification"

export const Chatbox = () => {

    const [currentView, setCurrentView] = useState("chat");
    const [currentChatView, setCurrentChatView] = useState("");
    const [incomingMessage, setIncomingMessage] = useState({});
    const [typingIndicator, setTypingIndicator] = useState(null)

  return (
    <div className="chatbox">
        <div className="boxcontainer">
            <div className="chatwrapper">
                <div className="tabi">
                    <LeftTab setCurrentView={setCurrentView}/>
                </div>

                <div className="leftbox">
                    <div className="content">
                        {currentView === "chat" && <Leftbox typingIndicator={typingIndicator} setCurrentView={setCurrentView} incomingMessage={incomingMessage} setCurrentChatView={setCurrentChatView} />}
                        {currentView === "settings" && <Settings />}
                        {currentView === "find_friends" && <FindFrinds />}
                        {currentView === "profile" && <Profile />}
                        {currentView === "notification" && <Notification />}
                    </div>
                </div>

                <div className="viewchat">
                    {
                        currentChatView === "" ?
                        (<Selected />)
                        :
                        (
                            <MainViewChat 
                                setCurrentChatView={setCurrentChatView} 
                                currentChatView={currentChatView} 
                                setIncomingMessage={setIncomingMessage}
                                typingIndicator={typingIndicator}
                                setTypingIndicator={setTypingIndicator}
                            />
                        )
                      
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}