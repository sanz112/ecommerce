import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. Please set it in your .env file.")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={(to) => window.history.pushState(null, '', to)}> */}
   <ClerkProvider>
    <App />
    </ClerkProvider>
  </StrictMode>,
)
