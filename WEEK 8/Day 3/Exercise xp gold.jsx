import React, { useReducer, useState } from 'react';

function todoReducer(todos, action) {
  switch (action.type) {
    case 'add':
      return [...todos, action.todo];
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unknown todo action: ${action.type}`);
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = newTodo.trim();

    if (!text) {
      return;
    }

    dispatch({
      type: 'add',
      todo: {
        id: crypto.randomUUID(),
        text
      }
    });
    setNewTodo('');
  };

  return (
    <section className="exercise-card todo-card" aria-labelledby="todo-heading">
      <div>
        <p className="eyebrow">Exercise 3</p>
        <h2 id="todo-heading">Todo list</h2>
        <form className="todo-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">
            New todo
          </label>
          <input
            id="new-todo"
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add a todo..."
          />
          <button className="theme-button" type="submit" disabled={!newTodo.trim()}>
            Add todo
          </button>
        </form>
        {todos.length === 0 ? (
          <p className="todo-empty">No todos yet. Add one above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <span>{todo.text}</span>
                <button
                  className="remove-todo"
                  type="button"
                  onClick={() => dispatch({ type: 'remove', id: todo.id })}
                  aria-label={`Remove ${todo.text}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default TodoList;