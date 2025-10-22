import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [received, setReceived] = useState([])
    const [receivedLoading, setReceivedLoading] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState([])
    const [error, setIsError] = useState("")
    const [notificationCount, setNotificationCount] = useState(0)
    const [isLoadingFriends, setIsLoadingFriends] = useState(false)
    const [errorFriend, setErrorFriend] = useState(false)

    const url = import.meta.env.VITE_API_URL
      useEffect(() => {
        const getAuthenticated = async () => {
          try {
            const response = await fetch(`${url}/isAuthenticated/`, {
              method: 'GET',
              credentials: 'include',
            });
      
            if (response.ok) {
              const data = await response.json();
              setIsAuthenticated(data.auth);
            }
          } catch (error) {
            return error
          }
        };
      
        getAuthenticated();
      }, [url]);


  return (
    <AuthContext.Provider value={{
        isAuthenticated, 
        setIsAuthenticated,
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
        setErrorFriend,
        errorFriend,
        setIsLoadingFriends,
        isLoadingFriends,
        }}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}