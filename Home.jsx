import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs')
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      // Fallback data untuk testing
      setBlogs([
        {
          id: 1,
          title: 'Welcome to My Blog',
          excerpt: 'Ini adalah postingan pertama saya di blog ini.',
          content: 'Selamat datang di blog saya! Di sini saya akan berbagi tips dan trik programming.',
          author: 'Reza',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Belajar React',
          excerpt: 'Panduan lengkap belajar React untuk pemula.',
          content: 'React adalah library JavaScript yang sangat populer untuk membangun UI yang interaktif.',
          author: 'Reza',
          createdAt: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-16">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Blog Saya</h1>
        <p className="text-xl text-gray-600">Berbagi pengetahuan tentang web development dan programming</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <article key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>{blog.author}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
            <Link 
              to={`/blog/${blog.id}`} 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Baca Selengkapnya →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}