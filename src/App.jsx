import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Chatbox } from './pages/chatbox/Chatbox';
import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from './utils/contexts/AuthContextProvider';
import { FetchRecievedRequest, FetchRequests } from './utils/hooks/FetchRequests';
import axios from 'axios';
import RequestPassword from './pages/RequestPassword';
import { EmailSent } from './pages/Email-Sent';
import { ResetPassword } from './pages/ResetPassword';

function App() {
  
  const { isAuthenticated, setIsAuthenticated, setReceived,setIsLoading, setusersData, setIsError, setFriends } = useContext(AuthContext)
  const { received } = FetchRecievedRequest()
  const { users } = FetchRequests()
  const url = import.meta.env.VITE_API_URL

  useEffect(() => {

    const getAuthenticated = async () => {
        try {
            const response = await fetch(`${url}api/isAuthenticated/`, {method:"GET", credentials:"include"})

            if(response.ok){
                const data = await response.json()
                console.log(data)
                setIsAuthenticated(true)
            }else{
                const err = await response.json()
                console.log(err)
            }

        } catch (error){
            console.log(error)
        }
    }

    getAuthenticated()

}, [url, setIsAuthenticated])

  useEffect(() => {
    setReceived(received)
    setFriends(users)
  }, [setReceived, received, setFriends, users])

  useEffect(() => {
      
      const getAllUsers = async () => {
          setIsLoading(true)

          try {
              const response = await axios.get(`${url}api/users/`, {withCredentials:true})
              setusersData(response.data.data.users)
              setIsLoading(false)

          } catch (error) {
              console.log("error", error)
              setIsError("Error Retrieving users")
          }finally{
              setIsLoading(false)
          }
      }

      if(isAuthenticated){
          getAllUsers()
      }
      
  }, [isAuthenticated, url, setIsError, setIsLoading, setusersData])


  const routes = useMemo(() => (
    <Routes>

       {
          isAuthenticated ?
          (
            <>
              <Route path='/' element={ <Chatbox />  } />
              <Route path='*' element={<Navigate to={"/"} />} />
            </>
          )
          :
          (
            <>
              <Route path='/auth/login' element={ <Login />} />
              <Route path='/auth/register' element={ <Register /> } />
              <Route path='/reset-password' element={ <RequestPassword /> } />
              <Route path='/change-password' element={ <ResetPassword /> } />
              <Route path='/email-done' element={ <EmailSent /> } />
              <Route path='*' element={<Navigate to={"/auth/login"} />} />
            </>
            
          )
            
      }

        
        
    </Routes>
  ), [isAuthenticated])

  return (
    <>
    <div className='chat'>
      {routes}
    </div>
      

    <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            stacked
            transition: Bounce 
        />
    </>
  )
}

export default App
