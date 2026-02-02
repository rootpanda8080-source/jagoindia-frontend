import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { FiEdit2, FiTrash2, FiEye, FiUser, FiCalendar } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import dayjs from 'dayjs'
import 'react-loading-skeleton/dist/skeleton.css'

export const BlogDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await blogAPI.getBySlug(slug)
        setBlog(response.data.blog)
      } catch (error) {
        console.error('Failed to fetch blog:', error)
        toast.error('Blog not found')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug, navigate])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      await blogAPI.delete(blog._id)
      toast.success('Blog deleted successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog')
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 w-full py-12">
          <Skeleton height={400} className="mb-8" />
          <Skeleton count={5} />
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 w-full text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Blog not found</p>
        </div>
      </div>
    )
  }

  const isAuthor = user && user.id === blog.author._id

  return (
    <>
      <Helmet>
        <title>{blog.title} - JagoIndia</title>
        <meta name="description" content={blog.content.substring(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.substring(0, 160)} />
        {blog.thumbnail && <meta property="og:image" content={blog.thumbnail} />}
      </Helmet>

      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <article className="container mx-auto px-4 w-full py-12 flex flex-col">
          {/* Thumbnail */}
          {blog.thumbnail && (
            <div className="mb-8 rounded-lg overflow-hidden h-96">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            {blog.author && (
              <div className="flex items-center gap-2">
                <FiUser size={18} />
                {blog.author.name}
              </div>
            )}
            <div className="flex items-center gap-2">
              <FiCalendar size={18} />
              {dayjs(blog.createdAt).format('MMM DD, YYYY')}
            </div>
            <div className="flex items-center gap-2">
              <FiEye size={18} />
              {blog.views} views
            </div>
          </div>

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <div className="text-lg text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Actions */}
          {isAuthor && (
            <div className="flex gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <FiEdit2 size={18} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <FiTrash2 size={18} />
                Delete
              </button>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
