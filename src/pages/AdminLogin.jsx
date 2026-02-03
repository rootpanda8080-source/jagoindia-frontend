import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { authAPI } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { FiMail, FiLock, FiLogIn, FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'

export const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, user, loading: authLoading } = useAuth()

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
      navigate('/admin/dashboard', { replace: true })
    } catch (error) {
      let message = 'Login failed'
      if (error.response) {
        message = error.response.data?.message || (error.response.status === 401 ? 'Invalid credentials' : 'Server error')
      } else if (error.request) {
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

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 px-4 py-12 sm:py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="relative z-10 w-full max-w-md">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-8 transition-colors group"
          >
            <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-2xl p-8 sm:p-10 border border-white/20 dark:border-slate-800/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
                J
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to manage your blog content
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="admin@jagoindia.com"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    <FiLogIn size={20} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Error message */}
            {errorMessage && (
              <div className="mt-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">Demo Credentials</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <code className="block bg-white dark:bg-slate-800 px-3 py-2 rounded text-sm font-mono text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">admin@jagoindia.com</code>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Password</p>
                  <code className="block bg-white dark:bg-slate-800 px-3 py-2 rounded text-sm font-mono text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700">admin123456</code>
                </div>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
            Powered by <span className="font-semibold text-blue-600">JagoIndia</span>
          </p>
        </div>
      </div>
    </>
  )
}
