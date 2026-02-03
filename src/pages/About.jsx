import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiTarget, FiZap } from 'react-icons/fi'

export const About = () => {
  const values = [
    { icon: FiCheck, title: 'Fact-First', description: 'We verify claims and link to authoritative sources' },
    { icon: FiTarget, title: 'Reader-Focused', description: 'Practical, accessible explanations for everyone' },
    { icon: FiZap, title: 'Independent', description: 'No commercial influence over editorial choices' },
  ]

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
      <Helmet>
        <title>About - JagoIndia</title>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Curating Stories That <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Matter</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
              JagoIndia is a modern publication dedicated to sharing insightful articles, thoughtful essays, and practical guides that empower our readers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              JagoIndia is a modern publication covering news, analysis, and stories that matter to Indian readers. We aim to provide thoughtful, well-researched content with an emphasis on clarity and practical insight.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Our writers are experienced journalists, researchers, and subject matter experts. We value accuracy, transparency, and reader trust above all else.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg hover:scale-105"
            >
              Explore Articles
              <FiArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100K+</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Monthly Readers</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Published Articles</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Expert Writers</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">10+</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These principles guide every decision we make and every article we publish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl transition-all hover:-translate-y-1 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center mb-5 group-hover:shadow-lg transition-all">
                    <Icon className="text-blue-600 dark:text-blue-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover thoughtfully curated articles and join our community of informed readers
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8 py-4 rounded-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Start Reading
            <FiArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
