import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './store/CartContext.jsx'
import { AuthProvider } from "./store/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
        <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
