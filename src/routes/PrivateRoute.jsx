import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
