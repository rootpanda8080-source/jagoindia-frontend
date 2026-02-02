import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api.js'
import { FiSave } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { RichEditor } from '../components/RichEditor.jsx'

export const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    status: 'published',
    category: '',
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        // Try fetching by ID first (admin/edit uses id param)
        let response
        try {
          response = await blogAPI.getById(id)
        } catch (err) {
          // fallback to slug endpoint
          response = await blogAPI.getBySlug(id)
        }
        const blog = response.data.blog
        setFormData({
          title: blog.title,
          content: blog.content,
          thumbnail: blog.thumbnail || '',
          status: blog.status,
          category: blog.category || '',
        })
      } catch (error) {
        // Try fetching all blogs and find by ID
        try {
          const response = await blogAPI.getAll(1, 100)
          const blog = response.data.blogs.find(b => b._id === id)
          if (blog) {
            setFormData({
              title: blog.title,
              content: blog.content,
              thumbnail: blog.thumbnail || '',
              status: blog.status,
              category: blog.category || '',
            })
          } else {
            toast.error('Blog not found')
            navigate('/admin/dashboard')
          }
        } catch (err) {
          toast.error('Failed to load blog')
          navigate('/admin/dashboard')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      await blogAPI.update(id, formData)
      toast.success('Blog updated successfully!')
      navigate('/admin/dashboard')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update blog'
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 w-full py-12">
          <Skeleton height={50} className="mb-4" />
          <Skeleton count={10} height={40} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Edit Blog - JagoIndia</title>
        <meta name="description" content="Edit your blog post" />
      </Helmet>

      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 w-full py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Edit Blog
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-8 space-y-6 mb-12">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter blog title"
                disabled={saving}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="https://example.com/image.jpg"
                disabled={saving}
              />
              {formData.thumbnail && (
                <div className="mt-4 rounded-lg overflow-hidden h-48">
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <RichEditor value={formData.content} onChange={(val) => setFormData(prev => ({ ...prev, content: val }))} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select category</option>
                {['Tech','Politics','AI','Business','Startups','More'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={saving}
              >
                <option value="published">Published</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
              >
                <FiSave size={20} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
