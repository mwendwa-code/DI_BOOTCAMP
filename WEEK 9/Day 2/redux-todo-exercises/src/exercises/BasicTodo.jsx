import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

const initialState = {
  todos: [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Practice Redux', completed: true },
  ],
};

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now() + Math.random(),
    text,
    completed: false,
  },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

const devToolsEnhancer =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const store = createStore(todoReducer, devToolsEnhancer);

function TodoForm({ addTodoAction }) {
  const [text, setText] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodoAction(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a new todo"
        style={{
          flex: 1,
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          fontSize: '1rem',
        }}
      />
      <button
        type="submit"
        style={{
          background: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 16px',
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        Add
      </button>
    </form>
  );
}

function TodoItem({ todo, toggleTodoAction, deleteTodoAction }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', padding: '10px 0' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer' }}>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodoAction(todo.id)} />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#6b7280' : '#111827' }}>
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => deleteTodoAction(todo.id)}
        style={{
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 10px',
          cursor: 'pointer',
        }}
      >
        Remove
      </button>
    </li>
  );
}

function TodoList({ todos, toggleTodoAction, deleteTodoAction }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodoAction={toggleTodoAction}
          deleteTodoAction={deleteTodoAction}
        />
      ))}
    </ul>
  );
}

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = (dispatch) => ({
  addTodoAction: (text) => dispatch(addTodo(text)),
  toggleTodoAction: (id) => dispatch(toggleTodo(id)),
  deleteTodoAction: (id) => dispatch(deleteTodo(id)),
});

const ConnectedTodoForm = connect(null, mapDispatchToProps)(TodoForm);
const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

function ExerciseOne() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginTop: 0 }}>Exercise 1: Basic Todo List</h2>
      <Provider store={store}>
        <div>
          <ConnectedTodoForm />
          <ConnectedTodoList />
        </div>
      </Provider>
    </div>
  );
}

export default ExerciseOne;
