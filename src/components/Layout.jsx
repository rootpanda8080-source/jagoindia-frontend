import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'

/**
 * Layout wrapper that conditionally shows Navbar and Footer
 * Hides both for admin login page
 * Provides proper flex layout with footer stuck to bottom
 */
export const Layout = ({ children }) => {
  const location = useLocation()
  const isAdminLogin = location.pathname === '/admin/login'

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar - Hidden on admin login */}
      {!isAdminLogin && <Navbar />}

      {/* Main Content - Grows to fill available space */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer - Hidden on admin login, sticks to bottom naturally */}
      {!isAdminLogin && <Footer />}
    </div>
  )
}
