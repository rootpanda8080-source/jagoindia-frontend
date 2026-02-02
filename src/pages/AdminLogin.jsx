import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { authAPI } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, user, loading: authLoading } = useAuth()

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [authLoading, user, navigate])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // clear inline errors when user types
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.login(formData)
      const { token, user } = response.data

      login(token, user)
      toast.success('Login successful!')
      setErrorMessage('')
      // navigate after auth state updated
      navigate('/admin/dashboard', { replace: true })
    } catch (error) {
      let message = 'Login failed'
      if (error.response) {
        // server responded with a status code
        message = error.response.data?.message || (error.response.status === 401 ? 'Invalid credentials' : 'Server error')
      } else if (error.request) {
        // no response received
        message = 'Network error. Please check your connection.'
      } else {
        message = error.message
      }

      setErrorMessage(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login - JagoIndia</title>
        <meta name="description" content="Admin login for JagoIndia" />
      </Helmet>

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-2xl p-8">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Sign in to manage your blog
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="admin@jagoindia.com"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : (
                  <FiLogIn size={20} />
                )}
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Inline error message */}
            {errorMessage && (
              <div role="alert" aria-live="assertive" className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </div>
            )}

            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Email: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">admin@jagoindia.com</code></p>
              <p>Password: <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">admin123456</code></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
