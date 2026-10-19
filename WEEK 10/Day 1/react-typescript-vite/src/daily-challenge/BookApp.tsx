import { useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

export interface Book {
  id: number
  title: string
  author: string
}

interface ListProps<T extends { id: number }> {
  items: T[]
  renderItem: (item: T) => ReactNode
}

export function List<T extends { id: number }>({
  items,
  renderItem,
}: ListProps<T>) {
  return (
    <ul className="book-list">
      {items.map((item) => (
        <li className="book-list-item" key={item.id}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

const initialBooks: Book[] = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 3, title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin' },
]

function BookApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const nextBookId = useRef(4)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editAuthor, setEditAuthor] = useState('')

  function startEdit(book: Book) {
    setEditingId(book.id)
    setEditTitle(book.title)
    setEditAuthor(book.author)
    setFormError(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditTitle('')
    setEditAuthor('')
  }

  function saveEdit(id: number) {
    const t = editTitle.trim()
    const a = editAuthor.trim()
    if (!t || !a) {
      setFormError('Enter both a title and an author.')
      return
    }

    setBooks((currentBooks) =>
      currentBooks.map((b) => (b.id === id ? { ...b, title: t, author: a } : b)),
    )
    cancelEdit()
  }

  function removeBook(id: number) {
    setBooks((currentBooks) => currentBooks.filter((b) => b.id !== id))
    if (editingId === id) cancelEdit()
  }

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()
    if (!trimmedTitle || !trimmedAuthor) {
      setFormError('Enter both a title and an author.')
      return
    }

    const id = nextBookId.current
    nextBookId.current += 1
    setBooks((currentBooks) => [
      ...currentBooks,
      { id, title: trimmedTitle, author: trimmedAuthor },
    ])
    setTitle('')
    setAuthor('')
    setFormError(null)
  }

  return (
    <div className="book-app">
      <p className="muted-copy" role="status">
        {books.length} {books.length === 1 ? 'book' : 'books'} in your list
      </p>

      <form className="book-form" onSubmit={addBook}>
        <label className="book-field">
          <span>Title</span>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setFormError(null)
            }}
            placeholder="e.g. The Hobbit"
            required
          />
        </label>
        <label className="book-field">
          <span>Author</span>
          <input
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value)
              setFormError(null)
            }}
            placeholder="e.g. J.R.R. Tolkien"
            required
          />
        </label>
        <button className="control-button primary-button" type="submit">
          Add book
        </button>
      </form>

      {formError && (
        <p className="error-message book-form-error" role="alert">
          {formError}
        </p>
      )}

      <List
        items={books}
        renderItem={(book) => (
          <div>
            {editingId === book.id ? (
              <div className="book-edit-form">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                />
                <div className="book-item-controls">
                  <button
                    type="button"
                    className="control-button primary-button"
                    onClick={() => saveEdit(book.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="control-button reset-button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="book-item-display">
                <p className="book-title">{book.title}</p>
                <p className="muted-copy">by {book.author}</p>
                <div className="book-item-controls">
                  <button
                    type="button"
                    className="control-button"
                    onClick={() => startEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="control-button reset-button"
                    onClick={() => removeBook(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default BookApp
