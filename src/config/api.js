/**
 * Centralized API Configuration
 * All API calls use environment variables - NO hard-coded URLs
 */

// Get API base URL from environment (should be domain only, no trailing `/api`)
// IMPORTANT: No hard-coded backend URLs here. Set VITE_API_BASE_URL in .env files.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Log guidance
if (!import.meta.env.VITE_API_BASE_URL && import.meta.env.MODE === 'development') {
  console.warn('⚠️ VITE_API_BASE_URL not set. Please set VITE_API_BASE_URL in .env.development for local development')
}

if (!import.meta.env.VITE_API_BASE_URL && import.meta.env.MODE === 'production') {
  console.error('❌ VITE_API_BASE_URL is required in production')
}

export const CONFIG = {
  API_BASE_URL,
  SITE_URL: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  
  // Social Media URLs
  SOCIAL: {
    TWITTER: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/jagoindiaofficial',
    INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/rootpanda8',
    TELEGRAM: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/jagoindiaofficial',
    EMAIL: import.meta.env.VITE_EMAIL || 'amitxrajwar@gmail.com',
  },
}

// Log configuration in development
if (import.meta.env.MODE === 'development') {
  console.log('🚀 API Config:', { API_BASE_URL, SITE_URL: CONFIG.SITE_URL })
}

export default CONFIG
