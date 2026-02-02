import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

  // refetch when search or category changes
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

    // debounce small delay for search
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
        {/* Hero Section - center panel with accent gradient so page background stays consistent */}
        <section className="bg-transparent">
          <div className="container mx-auto px-4 py-10 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left - Intro */}
              <div className="md:col-span-7 lg:col-span-8">
                <div className="bg-gradient-to-br from-indigo-600 to-sky-500 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 md:p-12 text-white">
                  <div className="mb-3">
                    <span className="inline-block h-0.5 w-16 bg-white/60 rounded-full opacity-80" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
                    Ideas that move you
                  </h1>
                  <p className="mt-3 text-white/90 max-w-xl text-base">
                    Curated articles, thoughtful essays, and practical guides from independent creators. Read, learn, and build your perspective.
                  </p>
                  {/* Mobile search inside hero */}
                  <div className="mt-4 block md:hidden">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search titles, content, or category"
                      className="w-full px-3 py-2 rounded-lg border bg-white text-sm text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Right - Featured (optional) */}
              <div className="md:col-span-5 lg:col-span-4">
                <div className="hidden md:block">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-slate-700">
                    <p className="text-xs uppercase text-slate-700 dark:text-slate-300 tracking-wider mb-2">Featured</p>
                    {/* show first blog as a small feature if available */}
                    {blogs && blogs[0] ? (
                      <Link to={`/blog/${blogs[0].slug}`} className="flex gap-3 items-start hover:opacity-80 transition">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {blogs[0].thumbnail ? (
                            <img src={blogs[0].thumbnail} alt={blogs[0].title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">{blogs[0].title}</h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{blogs[0].author?.name} • {new Date(blogs[0].createdAt).toLocaleDateString()}</p>
                        </div>
                      </Link>
                    ) : (
                      <div className="text-sm text-slate-600 dark:text-slate-300">Explore the latest articles below.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid Section - Latest Articles */}
        <section className="bg-transparent -mt-6">
          <div className="container mx-auto px-4 w-full py-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Latest Articles</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Freshly published stories, updated daily.</p>
              </div>
            
              <div className="hidden sm:flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search titles, content, or category"
                    className="px-3 py-2 rounded-lg border w-full sm:w-64 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-sm"
                  />
                </div>
              </div>
            </div>
            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap mb-6">
              {['All','Tech','Politics','AI','Business','Startups','More'].map((cat) => {
                const value = cat === 'All' ? '' : cat
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(category === value ? '' : value)}
                    aria-pressed={category === value}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-shadow ${category === value ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-200'}`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-gradient-to-b from-white/40 to-white/20 dark:from-slate-900/60 dark:to-slate-900/40 rounded-xl overflow-hidden animate-pulse">
                    <div className="h-44 bg-slate-700/30"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-slate-600/30 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-600/30 rounded"></div>
                      <div className="h-3 bg-slate-600/30 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length > 0 ? (
              /* Blogs Found */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>

                {/* Pagination - Only show if multiple pages */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10 pt-6">
                    <Pagination current={page} total={totalPages} onPageChange={setPage} />
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex items-center justify-center py-16">
                <div className="max-w-xl text-center bg-gradient-to-b from-white/6 dark:from-white/4 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-slate-700/20 rounded-full p-4">
                      <FiInbox className="w-8 h-8 text-slate-200" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">No articles yet</h2>
                  <p className="text-sm text-slate-300">We’re preparing high-quality content for you. Check back soon.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
