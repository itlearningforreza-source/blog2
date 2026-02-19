import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${id}`)
      setBlog(response.data)
    } catch (error) {
      console.error('Error fetching blog:', error)
      // Fallback data
      setBlog({
        id: parseInt(id),
        title: 'Blog Post',
        content: 'Konten blog tidak ditemukan',
        author: 'Reza',
        createdAt: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-16">Loading...</div>
  }

  if (!blog) {
    return <div className="text-center py-16">Blog tidak ditemukan</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
        ← Kembali ke Home
      </Link>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex justify-between items-center text-gray-500 mb-8 pb-8 border-b">
          <span>{blog.author}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString('id-ID')}</span>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </p>
        </div>
      </article>
    </div>
  )
}