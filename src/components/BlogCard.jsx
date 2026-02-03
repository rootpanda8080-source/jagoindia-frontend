import { FiHeart, FiCalendar, FiUser, FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { blogAPI } from '../services/api'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

export const BlogCard = ({ blog }) => {
  const excerpt = blog.excerpt || blog.summary || (blog.content ? blog.content.replace(/(<([^>]+)>)/gi, '').slice(0, 140) + '...' : '')
  const [likes, setLikes] = useState(blog.likes || 0)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async (e) => {
    // Prevent any event propagation (especially important for mobile touch events)
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (isLiking) return
    setIsLiking(true)

    // Optimistic update: increment likes immediately
    const previousLikes = likes
    setLikes((l) => l + 1)

    try {
      const res = await blogAPI.like(blog._id)
      // Server returns { success: true, likes: updatedLikes }
      if (res?.data?.success && res.data.likes !== undefined) {
        setLikes(res.data.likes)
      } else {
        // Fallback if response structure is unexpected
        toast.error('Unexpected response format')
        setLikes(previousLikes)
      }
    } catch (err) {
      // Log error for debugging
      console.error('Like request failed:', err.message)
      toast.error('Failed to save like')
      // Revert on error
      setLikes(previousLikes)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Link to={`/blog/${blog.slug}`} className="group">
      <article className="h-full flex flex-col bg-gradient-to-b from-white/40 to-white/20 dark:from-slate-900/60 dark:to-slate-900/40 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-1">
        {/* Thumbnail */}
        {blog.thumbnail ? (
          <div className="overflow-hidden rounded-t-xl aspect-[16/9]">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-700 dark:from-slate-800 dark:to-slate-700" />
        )}

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
            {blog.title}
            </h3>
            <div className="ml-auto">
              <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">{blog.category}</span>
            </div>
          </div>

          {excerpt && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{excerpt}</p>
          )}

          <div className="mt-auto flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <FiUser className="opacity-80" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{blog.author.name ? blog.author.name.split(' ')[0] : 'Author'}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FiCalendar className="opacity-80" />
                <span>{dayjs(blog.createdAt).format('MMM D, YYYY • h:mm A')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  onTouchEnd={handleLike}
                  disabled={isLiking}
                  className="inline-flex items-center gap-2 text-inherit focus:outline-none hover:opacity-75 transition-opacity"
                >
                  <FiHeart className="opacity-80" />
                  <span>{likes}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="opacity-80" />
                <span>{blog.views || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
