import { Helmet } from 'react-helmet-async'
import { FiMail, FiInstagram, FiTwitter, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi'
import { RiTelegramLine } from 'react-icons/ri'
import { CONFIG } from '../config/api'

export const Contact = () => {
  const contactMethods = [
    {
      icon: FiMail,
      label: 'Email',
      value: CONFIG.SOCIAL.EMAIL,
      link: `mailto:${CONFIG.SOCIAL.EMAIL}`,
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: FiTwitter,
      label: 'Twitter',
      value: '@jagoindiaofficial',
      link: CONFIG.SOCIAL.TWITTER,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: FiInstagram,
      label: 'Instagram',
      value: '@rootpanda8',
      link: CONFIG.SOCIAL.INSTAGRAM,
      color: 'from-pink-500 to-purple-500',
    },
    {
      icon: RiTelegramLine,
      label: 'Telegram',
      value: '@jagoindiaofficial',
      link: CONFIG.SOCIAL.TELEGRAM,
      color: 'from-blue-500 to-cyan-400',
    },
  ]

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
      <Helmet>
        <title>Contact - JagoIndia</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Let's Connect & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Collaborate</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Have questions, feedback, or partnership ideas? We'd love to hear from you. Reach out through any of our channels.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Methods</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose your preferred way to get in touch with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon
            return (
              <a
                key={idx}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.label}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {method.value}
                  <FiArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </a>
            )
          })}
        </div>

        {/* Quick Response */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-1">
              <FiMail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quick Response</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We typically respond to inquiries within 24 hours. For urgent matters, please mention "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How can I submit a guest post?',
                a: 'Email us at ' + CONFIG.SOCIAL.EMAIL + ' with your article pitch. Include a brief bio and links to your previous work.',
              },
              {
                q: 'Can I advertise on JagoIndia?',
                a: 'Yes! We offer various advertising packages. Contact us to discuss your specific needs.',
              },
              {
                q: 'How often do you publish new articles?',
                a: 'We publish new articles daily. Follow us on social media to stay updated with the latest content.',
              },
              {
                q: 'Can I get featured in your newsletter?',
                a: 'Absolutely! If you have interesting content or insights to share, reach out to us via email.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 dark:text-white">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
