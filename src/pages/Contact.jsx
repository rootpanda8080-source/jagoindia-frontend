import { Helmet } from 'react-helmet-async'
import { FiMail, FiInstagram } from 'react-icons/fi'
import { RiTelegramLine } from 'react-icons/ri'
import { FiTwitter } from 'react-icons/fi'
import { CONFIG } from '../config/api'

export const Contact = () => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
      <Helmet>
        <title>Contact - JagoIndia</title>
      </Helmet>

      <header className="bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Get in touch</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">We'd love to hear from you — questions, feedback, or partnership inquiries.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Connect with us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Get in touch through email or follow us on social media for the latest updates.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <FiMail size={24} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                  <a href={`mailto:${CONFIG.SOCIAL.EMAIL}`} className="text-blue-600 hover:underline font-medium">{CONFIG.SOCIAL.EMAIL}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <FiTwitter size={24} className="text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</p>
                  <a href={CONFIG.SOCIAL.TWITTER} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">@jagoindiaofficial</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <FiInstagram size={24} className="text-pink-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</p>
                  <a href={CONFIG.SOCIAL.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">@rootpanda8</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <RiTelegramLine size={24} className="text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Telegram</p>
                  <a href={CONFIG.SOCIAL.TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">@jagoindiaofficial</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Contact
