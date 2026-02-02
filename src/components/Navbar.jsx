import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ThemeToggle } from './ThemeToggle.jsx'
import { FiLogOut, FiPlusSquare, FiHome, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Mobile - Hamburger (left of logo) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {open ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-300 transition">
              <FiHome size={24} />
              JagoIndia
            </Link>
          </div>

          {/* Center - Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/admin/create-blog"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition font-medium"
                >
                  <FiPlusSquare size={18} />
                  <span className="hidden sm:inline">New</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition font-medium"
                >
                  <FiLogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              <Link to="/" onClick={() => setOpen(false)} className="font-medium text-gray-700 dark:text-gray-300">Home</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="font-medium text-gray-700 dark:text-gray-300">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="font-medium text-gray-700 dark:text-gray-300">Contact</Link>
              {user ? (
                <>
                  <Link to="/admin/dashboard" onClick={() => setOpen(false)} className="font-medium text-gray-700 dark:text-gray-300">Dashboard</Link>
                  <Link to="/admin/create-blog" onClick={() => setOpen(false)} className="font-medium text-gray-700 dark:text-gray-300">New</Link>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="text-left font-medium text-red-600">Logout</button>
                </>
              ) : (
                <Link to="/admin/login" onClick={() => setOpen(false)} className="font-medium text-gray-700 dark:text-gray-300">Login</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
