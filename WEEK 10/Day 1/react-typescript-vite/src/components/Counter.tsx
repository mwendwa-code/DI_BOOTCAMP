import { useState } from 'react'

type CounterAction = 'Incremented' | 'Decremented' | 'Reset'

function Counter() {
  const [count, setCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<CounterAction | 'No action yet'>(
    'No action yet',
  )

  function increment() {
    setCount((currentCount) => currentCount + 1)
    setLastAction('Incremented')
  }

  function decrement() {
    setCount((currentCount) => currentCount - 1)
    setLastAction('Decremented')
  }

  function reset() {
    setCount(0)
    setLastAction('Reset')
  }

  return (
    <div className="counter-content">
      <div className="counter-display" aria-live="polite">{count}</div>
      <p className="muted-copy action-copy">
        Last action <span>{lastAction}</span>
      </p>
      <div className="counter-controls" aria-label="Counter controls">
        <button className="control-button secondary-button" onClick={decrement} aria-label="Decrement counter">
          −
        </button>
        <button className="control-button reset-button" onClick={reset}>Reset</button>
        <button className="control-button primary-button" onClick={increment} aria-label="Increment counter">
          +
        </button>
      </div>
    </div>
  )
}

export default Counter
