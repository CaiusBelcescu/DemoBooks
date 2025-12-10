import React, { useEffect, useState } from 'react'
import useBooks from './hooks/useBooks'
import BookCard from './components/BookCard'

export default function App() {
  const { books: remoteBooks, isLoading, error } = useBooks()
  const [books, setBooks] = useState(remoteBooks || [])
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({ title: '', description: '' })

  useEffect(() => {
    if (remoteBooks) setBooks(remoteBooks)
  }, [remoteBooks])

  function validate() {
    const next = { title: '', description: '', image: '' }
    if (!title.trim()) next.title = 'Title is required.'
    if (description.trim().length < 10) next.description = 'Description must be at least 10 characters.'
    setErrors(next)
    return !next.title && !next.description
  }

  function checkImage(url) {
    return new Promise((resolve) => {
      try {
        // basic URL parse
        new URL(url)
      } catch (e) {
        resolve(false)
        return
      }
      const img = new Image()
      let settled = false
      const to = setTimeout(() => {
        if (!settled) {
          settled = true
          img.src = ''
          resolve(false)
        }
      }, 3500)
      img.onload = () => {
        if (!settled) {
          settled = true
          clearTimeout(to)
          resolve(true)
        }
      }
      img.onerror = () => {
        if (!settled) {
          settled = true
          clearTimeout(to)
          resolve(false)
        }
      }
      img.src = url
    })
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!validate()) return

    if (imageUrl.trim()) {
      const ok = await checkImage(imageUrl.trim())
      if (!ok) {
        setErrors((s) => ({ ...s, image: 'Image URL is not valid or not reachable.' }))
        return
      }
    }

    const newBook = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      image: imageUrl.trim() || ''
    }
    setBooks([newBook, ...books])
    setTitle('')
    setDescription('')
    setImageUrl('')
    setShowForm(false)
    setErrors({ title: '', description: '' })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">BookCard Demo</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowForm((s) => !s)}
              className="bg-primary text-white px-3 py-1.5 rounded"
            >
              {showForm ? 'Cancel' : 'Create New Book'}
            </button>
          </div>
        </div>

        {isLoading && <p className="text-slate-500">Loading books…</p>}
        {error && <p className="text-red-500">Failed to load books</p>}

        {showForm && (
          <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded shadow">
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter book title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="Enter a description (at least 10 characters)"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="https://example.com/cover.jpg"
              />
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                Add Book
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {books && books.map((b) => (
            <BookCard key={b.id} title={b.title} description={b.description} image={b.image} />
          ))}
        </div>
      </div>
    </div>
  )
}
