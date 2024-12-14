import { useState } from "react"
import { Leftbox } from "./Leftbox"
import { MainViewChat } from "./MainViewChat"
import '../../assets/CSS/chatbox.css'
import { LeftTab } from "../../components/LeftTab"
import { Settings } from "../Settings"
import FindFrinds from "./FindFrinds"
import Profile from "./Profile"
import Selected from "../../components/!Selected"

export const Chatbox = () => {

    const [currentView, setCurrentView] = useState("chat");
    const [currentChatView, setCurrentChatView] = useState(false)

  return (
    <div className="chatbox">
        <div className="boxcontainer">
            <div className="chatwrapper">
                <div className="tabi">
                    <LeftTab setCurrentView={setCurrentView}/>
                </div>

                <div className="leftbox">
                    <div className="content">
                        {currentView === "chat" && <Leftbox setCurrentChatView={setCurrentChatView} />}
                        {currentView === "settings" && <Settings />}
                        {currentView === "find_friends" && <FindFrinds />}
                        {currentView === "profile" && <Profile />}
                    </div>
                </div>

                <div className="viewchat">
                    {
                    currentChatView ?
                    
                      (<MainViewChat />)
                      : 
                      (<Selected />)
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}
