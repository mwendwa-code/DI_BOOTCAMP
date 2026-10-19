import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  username: string
  email: string
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const user = value as Record<string, unknown>
  return (
    typeof user.id === 'number' &&
    typeof user.name === 'string' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string'
  )
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState<number>(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(`The server responded with status ${response.status}.`)
        }

        const data: unknown = await response.json()
        if (!Array.isArray(data) || !data.every(isUser)) {
          throw new Error('The server returned user data in an unexpected format.')
        }

        setUsers(data)
      } catch (cause: unknown) {
        if (cause instanceof DOMException && cause.name === 'AbortError') {
          return
        }

        setError(
          cause instanceof Error
            ? cause.message
            : 'An unexpected error occurred while loading users.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()
    return () => controller.abort()
  }, [retryCount])

  return (
    <div className="directory">
      <div className="directory-summary">
        <p className="muted-copy">Fetched from JSONPlaceholder</p>
        {!isLoading && !error && (
          <span className="directory-count">{users.length} members</span>
        )}
      </div>

      {isLoading && (
        <p className="feedback-message" role="status">
          <span className="loading-spinner" aria-hidden="true" />
          Loading people…
        </p>
      )}

      {error && (
        <div className="error-message" role="alert">
          <p>Could not load the directory. {error}</p>
          <button
            className="retry-button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <ul className="user-list">
          {users.map((user) => (
            <li className="directory-user" key={user.id}>
              <div className="avatar avatar-directory" aria-hidden="true">
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .filter((initial): initial is string => initial !== undefined)
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>
              <div className="directory-user-info">
                <p className="user-name">{user.name}</p>
                <p className="muted-copy">@{user.username}</p>
              </div>
              <a className="email-link" href={`mailto:${user.email}`}>
                {user.email}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserList
