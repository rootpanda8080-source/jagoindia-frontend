import { FiHeart, FiCalendar, FiUser, FiEye, FiArrowRight } from 'react-icons/fi'
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
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (isLiking) return
    setIsLiking(true)

    const previousLikes = likes
    setLikes((l) => l + 1)

    try {
      const res = await blogAPI.like(blog._id)
      if (res?.data?.success && res.data.likes !== undefined) {
        setLikes(res.data.likes)
      } else {
        toast.error('Unexpected response format')
        setLikes(previousLikes)
      }
    } catch (err) {
      console.error('Like request failed:', err.message)
      toast.error('Failed to save like')
      setLikes(previousLikes)
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Link to={`/blog/${blog.slug}`} className="group h-full">
      <article className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600">
          {blog.thumbnail ? (
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20" />
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-block px-3 py-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur text-xs font-bold text-blue-600 dark:text-blue-400 rounded-full shadow-lg border border-white/20 dark:border-slate-700/20">
              {blog.category}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Metadata */}
          <div className="space-y-4 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
            {/* Author & Date */}
            <div className="flex items-center gap-3 text-sm">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                    {blog.author.name?.charAt(0) || 'A'}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white text-xs">
                      {blog.author.name ? blog.author.name.split(' ')[0] : 'Author'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {dayjs(blog.createdAt).format('MMM D')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                {/* Views */}
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <FiEye size={16} />
                  <span className="font-medium">{blog.views || 0}</span>
                </div>

                {/* Likes */}
                <button
                  onClick={handleLike}
                  onTouchEnd={handleLike}
                  disabled={isLiking}
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer group/like"
                >
                  <FiHeart size={16} className="group-hover/like:scale-110 transition-transform" />
                  <span className="font-medium">{likes}</span>
                </button>
              </div>

              {/* Read More Arrow */}
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <span className="text-xs font-semibold">Read</span>
                <FiArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
