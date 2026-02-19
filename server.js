import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Sample data - ganti dengan database nantinya
const blogs = [
  {
    id: 1,
    title: 'Welcome to My Blog',
    excerpt: 'Ini adalah postingan pertama saya di blog ini.',
    content: 'Selamat datang di blog saya! Di sini saya akan berbagi tips dan trik programming. Mari kita belajar bersama-sama.',
    author: 'Reza',
    createdAt: new Date('2026-02-10').toISOString()
  },
  {
    id: 2,
    title: 'Belajar React',
    excerpt: 'Panduan lengkap belajar React untuk pemula.',
    content: 'React adalah library JavaScript yang sangat populer untuk membangun UI yang interaktif. React menggunakan konsep virtual DOM untuk meningkatkan performa aplikasi.',
    author: 'Reza',
    createdAt: new Date('2026-02-15').toISOString()
  },
  {
    id: 3,
    title: 'Node.js untuk Backend',
    excerpt: 'Membangun API REST dengan Node.js dan Express.',
    content: 'Node.js memungkinkan kita untuk menulis JavaScript di backend. Express adalah framework populer untuk membuat API REST dengan Node.js.',
    author: 'Reza',
    createdAt: new Date('2026-02-18').toISOString()
  }
]

// Routes
app.get('/blogs', (req, res) => {
  res.json(blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
})

app.get('/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id))
  if (!blog) {
    return res.status(404).json({ message: 'Blog tidak ditemukan' })
  }
  res.json(blog)
})

app.post('/blogs', (req, res) => {
  const { title, excerpt, content, author } = req.body
  
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Data tidak lengkap' })
  }

  const newBlog = {
    id: Math.max(...blogs.map(b => b.id), 0) + 1,
    title,
    excerpt: excerpt || content.substring(0, 100),
    content,
    author,
    createdAt: new Date().toISOString()
  }

  blogs.push(newBlog)
  res.status(201).json(newBlog)
})

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`)
})