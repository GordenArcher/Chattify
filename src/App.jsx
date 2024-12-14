import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Chatbox } from './pages/chatbox/Chatbox';
import { useContext } from 'react';
import { AuthContext } from './utils/contexts/AuthContextProvider';

function App() {

  const { token } = useContext(AuthContext)
  console.log(token || "Nothing here")

  return (
    <>
      <Routes>
        <Route path='/' element={ token ? <Chatbox />  : <Login /> } />
        <Route path='/auth/register' element={ <Register /> } />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>

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
            transition: Bounce
        />
    </>
  )
}

export default App
