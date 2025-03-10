import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './utils/contexts/AuthContextProvider.jsx'
import { LazyLoad } from './components/LazyLoad.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MessagesProvider from './utils/contexts/MessagesProvider.jsx'
const App = lazy(() => import('./App.jsx'))

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <MessagesProvider>
        <GoogleOAuthProvider>
          <QueryClientProvider client={client}>
            <Suspense fallback={<LazyLoad />}>
            <App />
          </Suspense>
          </QueryClientProvider>
        </GoogleOAuthProvider> 
      </MessagesProvider>
      
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)