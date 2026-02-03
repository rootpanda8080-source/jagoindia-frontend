import { FiTwitter, FiMail, FiInstagram, FiArrowRight } from 'react-icons/fi'
import { RiTelegramLine } from 'react-icons/ri'
import { CONFIG } from '../config/api'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 border-t border-gray-200 dark:border-slate-800 mt-auto">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                JagoIndia
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A modern platform for sharing insightful articles and stories that matter.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  Home
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  About
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  Contact
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  Admin
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  All Articles
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  Categories
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center gap-2 group">
                  Privacy Policy
                  <FiArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href={CONFIG.SOCIAL.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 hover:text-white transition-all hover:shadow-lg hover:scale-110"
                title="Twitter"
                aria-label="Follow on Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href={CONFIG.SOCIAL.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-pink-600 dark:hover:bg-pink-600 text-gray-700 dark:text-gray-300 hover:text-white transition-all hover:shadow-lg hover:scale-110"
                title="Instagram"
                aria-label="Follow on Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href={CONFIG.SOCIAL.TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white transition-all hover:shadow-lg hover:scale-110"
                title="Telegram"
                aria-label="Join on Telegram"
              >
                <RiTelegramLine size={20} />
              </a>
              <a
                href={`mailto:${CONFIG.SOCIAL.EMAIL}`}
                className="p-3 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 text-gray-700 dark:text-gray-300 hover:text-white transition-all hover:shadow-lg hover:scale-110"
                title="Email"
                aria-label="Send email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-700 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} <span className="font-semibold text-gray-900 dark:text-white">JagoIndia</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
