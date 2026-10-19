import { useEffect, useState, type Key, type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  dataReceived,
  fetchFailed,
  fetchStarted,
} from '../features/dataSlice'

interface DataFetcherProps<T> {
  title: string
  fetchData: (signal: AbortSignal) => Promise<T[]>
  isItem: (value: unknown) => value is T
  getKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
}

export function DataFetcher<T>({
  title,
  fetchData,
  isItem,
  getKey,
  renderItem,
}: DataFetcherProps<T>) {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.data)
  const [retryCount, setRetryCount] = useState(0)
  const data = items.filter(isItem)

  useEffect(() => {
    const controller = new AbortController()
    dispatch(fetchStarted())

    fetchData(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          dispatch(dataReceived(result))
        }
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          dispatch(
            fetchFailed(
              cause instanceof Error
                ? cause.message
                : 'An unexpected error occurred while fetching data.',
            ),
          )
        }
      })

    return () => controller.abort()
  }, [dispatch, fetchData, retryCount])

  return (
    <section className="results-section" aria-labelledby="results-title">
      <div className="results-heading">
        <div>
          <p className="eyebrow">FRESH FROM THE RECIPE API</p>
          <h2 id="results-title">{title}</h2>
        </div>
        {status === 'succeeded' && (
          <span className="result-count">
            {data.length} {data.length === 1 ? 'recipe' : 'recipes'}
          </span>
        )}
      </div>

      {status === 'loading' && (
        <p className="feedback" role="status">
          <span className="spinner" aria-hidden="true" />
          Loading recipes…
        </p>
      )}

      {status === 'failed' && (
        <div className="error-panel" role="alert">
          <p>{error ?? 'Could not load recipes.'}</p>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      )}

      {status === 'succeeded' && data.length === 0 && (
        <p className="empty-state">No recipes were returned. Try again later.</p>
      )}

      {status === 'succeeded' && data.length > 0 && (
        <div className="recipe-grid">
          {data.map((item) => (
            <article className="recipe-card" key={getKey(item)}>
              {renderItem(item)}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
