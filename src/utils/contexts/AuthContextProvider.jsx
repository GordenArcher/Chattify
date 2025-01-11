import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("")
    const [received, setReceived] = useState([])
    const [receivedLoading, setReceivedLoading] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState([])
    const [error, setIsError] = useState("")
    const [notificationCount, setNotificationCount] = useState(0)
    const [isLoadingFriends, setIsLoadingFriends] = useState(false)
    const [errorFriend, setErrorFriend] = useState(false)
    const [friends, setFriends] = useState([])
    const [messages, setMessages] = useState([])
    

    const nav = useNavigate()
    

    useEffect(() => {
        const getuser = localStorage.getItem("token")

        if(getuser){
            setToken(getuser)
        }
    }, [])

    const saveToken = (userToken) => {
        localStorage.setItem("token", userToken)
        setToken(userToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        nav("/login")
    }

  return (
    <AuthContext.Provider value={{
        saveToken, 
        token, 
        logout, 
        received, 
        setReceived,
        setReceivedLoading,
        receivedLoading,
        loading,
        setIsLoading,
        usersData,
        setusersData,
        error,
        setIsError,
        notificationCount,
        setNotificationCount,
        setFriends,
        friends,
        setErrorFriend,
        errorFriend,
        setIsLoadingFriends,
        isLoadingFriends,
        messages,
        setMessages
        }}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}