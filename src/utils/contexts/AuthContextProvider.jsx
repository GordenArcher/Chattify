import PropTypes from 'prop-types'
import { createContext, useState, useEffect, useCallback } from 'react'

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
    
    const refreshToken = useCallback(
        async () => {
          try {
            const response = await fetch(`${url}/auth/refresh/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log('Access token refreshed:', data);
              setIsAuthenticated(true)
              return true;
            } else {
              console.error('Failed to refresh token');
              return false;
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
            return false;
          }
        },
        [url]
      );
      
      const call_refresh = useCallback(
        async (status, func) => {
          if (status === 401) {
            const refreshed = await refreshToken();
            if (refreshed) {
              return func();
            }
          }
          return null; 
        },
        [refreshToken]
      );
      
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
            } else {
              await call_refresh(response.status, getAuthenticated);
            }
          } catch (error) {
            await call_refresh(error, getAuthenticated);
          }
        };
      
        getAuthenticated();
      }, [url, call_refresh]);


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