import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { FiTrash2, FiEdit2, FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ChartCard, BarChart, LineChart } from '../components/ChartCard.jsx'

export const Dashboard = () => {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        // Use admin endpoint to fetch both published and disabled blogs
        const response = await blogAPI.getAdminBlogs(1, 999)
        const userBlogs = response.data.blogs.filter(b => b.author._id === user.id)
        setBlogs(userBlogs)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        toast.error('Failed to load blogs')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchBlogs()
    }
  }, [user])

  const handleToggleStatus = async (blogId, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'disabled' : 'published'

    try {
      await blogAPI.updateStatus(blogId, newStatus)
      setBlogs(blogs.map(b => 
        b._id === blogId ? { ...b, status: newStatus } : b
      ))
      toast.success(`Blog ${newStatus === 'published' ? 'published' : 'disabled'} successfully`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      await blogAPI.delete(blogId)
      setBlogs(blogs.filter(b => b._id !== blogId))
      toast.success('Blog deleted successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog')
    }
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - JagoIndia</title>
        <meta name="description" content="Your blog dashboard" />
      </Helmet>

      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 w-full py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name}! Manage your blogs here.
            </p>
          </div>

          {/* Stats Cards with Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ChartCard 
              title="Total Blogs" 
              value={blogs.length} 
              label="Published articles" 
              color="blue"
              trend={blogs.length > 0 ? 12 : 0}
            />
            <ChartCard 
              title="Total Views" 
              value={blogs.reduce((sum, b) => sum + (b.views || 0), 0)} 
              label="Page impressions" 
              color="green"
              trend={8}
            />
            <ChartCard 
              title="Total Likes" 
              value={blogs.reduce((sum, b) => sum + (b.likes || 0), 0)} 
              label="Reader engagements" 
              color="red"
              trend={15}
            />
          </div>

          {/* Advanced Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BarChart 
              title="Top Performing Blogs"
              data={blogs
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 5)
                .map(b => ({
                  label: b.title.substring(0, 20) + (b.title.length > 20 ? '...' : ''),
                  value: b.views || 0
                }))}
              color="blue"
            />
            <LineChart 
              title="Engagement Trend"
              data={[
                { label: 'Mon', value: blogs.reduce((sum, b) => sum + (b.views || 0), 0) * 0.7 },
                { label: 'Tue', value: blogs.reduce((sum, b) => sum + (b.views || 0), 0) * 0.85 },
                { label: 'Wed', value: blogs.reduce((sum, b) => sum + (b.views || 0), 0) * 0.9 },
                { label: 'Thu', value: blogs.reduce((sum, b) => sum + (b.views || 0), 0) * 0.75 },
                { label: 'Fri', value: blogs.reduce((sum, b) => sum + (b.views || 0), 0) },
              ]}
              color="green"
            />
          </div>

          {/* Blogs Table */}
          {loading ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <Skeleton count={5} height={50} />
            </div>
          ) : blogs.length > 0 ? (
            <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Title</th>
                    <th className="text-left px-6 py-4 font-semibold">Status</th>
                    <th className="text-left px-6 py-4 font-semibold">Views</th>
                    <th className="text-left px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {blog.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {blog.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          blog.status === 'published'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {blog.views}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleStatus(blog._id, blog.status)}
                            className={`p-2 rounded-lg transition ${
                              blog.status === 'published'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                                : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                            }`}
                            title={blog.status === 'published' ? 'Disable' : 'Publish'}
                          >
                            {blog.status === 'published' ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                          </button>
                          <Link
                            to={`/admin/edit-blog/${blog._id}`}
                            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                You haven't created any blogs yet.
              </p>
              <Link
                to="/admin/create-blog"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Create Your First Blog
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
