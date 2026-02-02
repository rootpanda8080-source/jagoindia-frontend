import axios from 'axios'
import { CONFIG } from '../config/api'

// Normalize base URL and ensure we call the backend's /api namespace
const normalizedBase = (CONFIG.API_BASE_URL || '').replace(/\/+$/g, '')
const API_ROOT = `${normalizedBase}/api`

export const api = axios.create({
  baseURL: API_ROOT,
  timeout: 10000,
})

// Request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored token on unauthorized but do NOT force a full page redirect here.
      // Let callers handle navigation so UI (toasts/inline messages) can show.
      localStorage.removeItem('jwt-token')
      delete api.defaults.headers.common['Authorization']
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
}

// Blog endpoints
export const blogAPI = {
  // options: { q, category, sort }
  getAll: (page = 1, limit = 12, options = {}) =>
    api.get('/blogs', { params: { page, limit, ...options } }),
  getAdminBlogs: (page = 1, limit = 999) =>
    api.get('/blogs/admin/my-blogs', { params: { page, limit } }),
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  getById: (id) => api.get(`/blogs/id/${id}`),
  create: (data) => api.post('/blogs', data),
  update: (id, data) => api.put(`/blogs/${id}`, data),
  updateStatus: (id, status) => api.patch(`/blogs/${id}/status`, { status }),
  delete: (id) => api.delete(`/blogs/${id}`),
  like: (id) => api.post(`/blogs/${id}/like`),
}

// System endpoints
export const systemAPI = {
  health: () => api.get('/health'),
}
