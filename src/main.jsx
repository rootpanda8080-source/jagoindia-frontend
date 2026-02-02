import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <App />
            <Toaster position="bottom-right" />
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>,
)
