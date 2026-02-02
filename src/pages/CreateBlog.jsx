import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogAPI } from '../services/api.js'
import { FiSave } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { RichEditor } from '../components/RichEditor.jsx'

export const CreateBlog = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
    status: 'published',
    category: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content || !formData.category) {
      toast.error('Please fill in title, content, and category')
      return
    }

    try {
      setLoading(true)
      await blogAPI.create(formData)
      toast.success('Blog created successfully!')
      navigate('/admin/dashboard')
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create blog'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Create Blog - JagoIndia</title>
        <meta name="description" content="Create a new blog post" />
      </Helmet>

      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Create New Blog
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
                disabled={loading}
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="https://example.com/image.jpg"
                disabled={loading}
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

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <RichEditor value={formData.content} onChange={(val) => setFormData(prev => ({ ...prev, content: val }))} />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              >
                <option value="published">Published</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
              >
                <FiSave size={20} />
                {loading ? 'Creating...' : 'Create Blog'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
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
