import { FiTwitter, FiMail, FiInstagram } from 'react-icons/fi'
import { RiTelegramLine } from 'react-icons/ri'
import { CONFIG } from '../config/api'

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto shadow-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">JagoIndia</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A modern blog platform for sharing your thoughts and ideas with the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Links</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Home</a></li>
              <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">About</a></li>
              <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Contact</a></li>
              <li><a href="/admin/login" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Admin</a></li>
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Blogs</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Follow</h3>
            <div className="flex gap-3">
              <a
                href={CONFIG.SOCIAL.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 hover:text-white transition"
                title="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href={CONFIG.SOCIAL.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-pink-600 dark:hover:bg-pink-600 text-gray-700 dark:text-gray-300 hover:text-white transition"
                title="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href={CONFIG.SOCIAL.TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white transition"
                title="Telegram"
              >
                <RiTelegramLine size={20} />
              </a>
              <a
                href={`mailto:${CONFIG.SOCIAL.EMAIL}`}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-green-600 dark:hover:bg-green-600 text-gray-700 dark:text-gray-300 hover:text-white transition"
                title="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; 2026 JagoIndia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
