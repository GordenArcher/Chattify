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
import RequestPassword from './pages/RequestPassword';
import { EmailSent } from './pages/Email-Sent';
import { ResetPassword } from './pages/ResetPassword';
import { GetUsers } from './api/UpdateData';

function App() {
  
  const { isAuthenticated, setReceived } = useContext(AuthContext)
  const { received } = FetchRecievedRequest()
  const { users } = FetchRequests()

  useEffect(() => {
    setReceived(received)
    
  }, [setReceived, received, users])

GetUsers()

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
