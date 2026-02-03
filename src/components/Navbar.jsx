import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'
import { FiLogOut, FiPlusSquare, FiMenu, FiX, FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50 sticky top-0 z-50 shadow-lg dark:shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl group-hover:shadow-lg group-hover:scale-105 transition-all">
              J
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JagoIndia
            </span>
          </Link>

          {/* Center - Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
            {user && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg font-medium transition-colors relative group"
              >
                Dashboard
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            )}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/admin/create-blog"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all hover:shadow-lg hover:scale-105"
                >
                  <FiPlusSquare size={18} />
                  Create
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all hover:shadow-lg hover:scale-105"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all hover:shadow-lg hover:scale-105 flex items-center gap-2"
              >
                Sign In
                <FiArrowRight size={18} />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl">
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/create-blog"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Create New Blog
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
