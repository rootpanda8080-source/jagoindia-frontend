import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { PrivateRoute } from './routes/PrivateRoute.jsx'
import { Home } from './pages/Home.jsx'
import { BlogDetails } from './pages/BlogDetails.jsx'
import { AdminLogin } from './pages/AdminLogin.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { CreateBlog } from './pages/CreateBlog.jsx'
import { EditBlog } from './pages/EditBlog.jsx'
import { About } from './pages/About.jsx'
import { Contact } from './pages/Contact.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes (prefixed with /admin) */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create-blog"
          element={
            <PrivateRoute>
              <CreateBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-blog/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
