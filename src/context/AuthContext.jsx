import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check token on mount
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jwt-token')
      if (token) {
        // ensure axios instance has Authorization header for the call
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const response = await api.get('/auth/me')
          setUser(response.data.user)
        } catch (error) {
          // token invalid or expired
          localStorage.removeItem('jwt-token')
          delete api.defaults.headers.common['Authorization']
          setUser(null)
        }
      }
      setLoading(false)
    }

    validateToken()
  }, [])

  const login = (token, userData) => {
    // Persist token and set axios default header immediately
    localStorage.setItem('jwt-token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // Update auth state
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('jwt-token')
    setUser(null)
    delete api.defaults.headers.common['Authorization']
  }

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
