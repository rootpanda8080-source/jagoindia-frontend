import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api.js'
import { BlogCard } from '../components/BlogCard.jsx'
import { Pagination } from '../components/Pagination.jsx'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FiInbox } from 'react-icons/fi'

export const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await blogAPI.getAll(page, 12, { q: search || undefined, category: category || undefined })
        setBlogs(response.data.blogs || [])
        setTotalPages(response.data.pagination?.pages || 1)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        toast.error('Failed to load blogs')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [page])

  useEffect(() => {
    setPage(1)
    const controller = new AbortController()
    const doFetch = async () => {
      try {
        setLoading(true)
        const response = await blogAPI.getAll(1, 12, { q: search || undefined, category: category || undefined })
        setBlogs(response.data.blogs || [])
        setTotalPages(response.data.pagination?.pages || 1)
      } catch (err) {
        if (err.name !== 'CanceledError') toast.error('Failed to load blogs')
      } finally {
        setLoading(false)
      }
    }

    const t = setTimeout(() => doFetch(), 300)
    return () => {
      clearTimeout(t)
      controller.abort()
    }
  }, [search, category])

  return (
    <>
      <Helmet>
        <title>JagoIndia - Curated Articles</title>
        <meta name="description" content="Discover insightful articles, stories, and perspectives on JagoIndia" />
        <meta property="og:title" content="JagoIndia - Curated Articles" />
        <meta property="og:description" content="Discover insightful articles, stories, and perspectives on JagoIndia" />
      </Helmet>

      <div className="w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite 2s' }} />
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ animation: 'blob 7s infinite 4s' }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Latest articles updated daily</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Ideas that <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">move you</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Curated articles, thoughtful essays, and practical guides from independent creators. Read, learn, and build your perspective.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative group">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles, authors, or topics..."
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-lg"
                  />
                  <svg className="absolute right-5 top-4 w-6 h-6 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Filter by:</span>
                <div className="flex gap-2 flex-wrap justify-center">
                  {['All', 'Tech', 'Politics', 'AI', 'Business', 'Startups', 'More'].map((cat) => {
                    const value = cat === 'All' ? '' : cat
                    const isActive = category === value
                    return (
                      <button
                        key={cat}
                        onClick={() => setCategory(category === value ? '' : value)}
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="h-1 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Featured</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Latest Articles
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Freshly published stories and insights</p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-3" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16 pt-8 border-t border-gray-200 dark:border-slate-800">
                  <Pagination current={page} total={totalPages} onPageChange={setPage} />
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 mb-6">
                  <FiInbox className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Try adjusting your search or filters. We're constantly publishing new content.</p>
              </div>
            </div>
          )}
        </section>

        {/* Style for blob animation */}
        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
      </div>
    </>
  )
}

export default Home
