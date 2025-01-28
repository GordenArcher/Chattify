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

function App() {
  
  const { token, setReceived,setIsLoading, setusersData, setIsError, setFriends } = useContext(AuthContext)
  const { received } = FetchRecievedRequest()
  const { users } = FetchRequests()

  useEffect(() => {
    setReceived(received)
    setFriends(users)
  }, [setReceived, received, setFriends, users])


  const BASE_URL = "http://127.0.0.1:8000/"

  const url = `${BASE_URL}api/users/`

  useEffect(() => {
      
      const getAllUsers = async () => {
          setIsLoading(true)

          try {
              const response = await axios.get(url, {headers: {"Authorization":`Token ${token}`}})
              setusersData(response.data.data.users)
              setIsLoading(false)

          } catch (error) {
              console.log("error", error)
              setIsError("Error Retrieving users")
          }finally{
              setIsLoading(false)
          }
      }

      if(token){
          getAllUsers()
      }
      
  }, [token, url, setIsError, setIsLoading, setusersData])

  const routes = useMemo(() => (
    <Routes>

       {
          token ?
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
              <Route path='/email-done' element={ <EmailSent /> } />
              <Route path='*' element={<Navigate to={"/auth/login"} />} />
            </>
            
          )
            
      }

        
        
    </Routes>
  ), [token])

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
