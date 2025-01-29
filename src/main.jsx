import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './utils/contexts/AuthContextProvider.jsx'
import { LazyLoad } from './components/LazyLoad.jsx'

const App = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <Suspense fallback={<LazyLoad />}>
        <App />
      </Suspense>
    </AuthContextProvider>
    
    </BrowserRouter>
    
  </StrictMode>,
)