import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SELECT_CATEGORY = 'SELECT_CATEGORY';

const initialState = {
  selectedCategory: 'work',
  categories: {
    work: [
      { id: 1, text: 'Finish dashboard design', completed: false },
      { id: 2, text: 'Send project update', completed: true },
    ],
    personal: [
      { id: 3, text: 'Go to the gym', completed: false },
      { id: 4, text: 'Call mom', completed: true },
    ],
    shopping: [
      { id: 5, text: 'Buy milk', completed: false },
      { id: 6, text: 'Get new headphones', completed: false },
    ],
  },
};

const addTodo = (category, text) => ({
  type: ADD_TODO,
  payload: { category, text },
});

const toggleTodo = (category, id) => ({
  type: TOGGLE_TODO,
  payload: { category, id },
});

const deleteTodo = (category, id) => ({
  type: DELETE_TODO,
  payload: { category, id },
});

const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category,
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { category, text } = action.payload;
      if (!state.categories[category]) return state;

      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: [
            ...state.categories[category],
            { id: Date.now() + Math.random(), text, completed: false },
          ],
        },
      };
    }

    case TOGGLE_TODO: {
      const { category, id } = action.payload;
      if (!state.categories[category]) return state;

      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: state.categories[category].map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        },
      };
    }

    case DELETE_TODO: {
      const { category, id } = action.payload;
      if (!state.categories[category]) return state;

      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: state.categories[category].filter((todo) => todo.id !== id),
        },
      };
    }

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
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

function CategoryTabs({ categories, selectedCategory, selectCategoryAction }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => selectCategoryAction(category)}
          style={{
            padding: '8px 14px',
            borderRadius: '999px',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            background: selectedCategory === category ? '#111827' : '#fff',
            color: selectedCategory === category ? '#fff' : '#111827',
            fontWeight: 700,
            textTransform: 'capitalize',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function TodoForm({ category, addTodoAction }) {
  const [text, setText] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodoAction(category, trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={`Add a todo to ${category}`}
        style={{
          flex: 1,
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 16px',
          background: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 700,
        }}
      >
        Add
      </button>
    </form>
  );
}

function TodoItem({ todo, category, toggleTodoAction, deleteTodoAction }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer' }}>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodoAction(category, todo.id)} />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#6b7280' : '#111827' }}>
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => deleteTodoAction(category, todo.id)}
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

function TodoList({ category, todos, toggleTodoAction, deleteTodoAction }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          category={category}
          toggleTodoAction={toggleTodoAction}
          deleteTodoAction={deleteTodoAction}
        />
      ))}
    </ul>
  );
}

const categoryTabsMapStateToProps = (state) => ({
  categories: Object.keys(state.categories),
  selectedCategory: state.selectedCategory,
});

const categoryTabsMapDispatchToProps = (dispatch) => ({
  selectCategoryAction: (category) => dispatch(selectCategory(category)),
});

const ConnectedCategoryTabs = connect(categoryTabsMapStateToProps, categoryTabsMapDispatchToProps)(CategoryTabs);

const formMapStateToProps = (state) => ({
  category: state.selectedCategory,
});

const formMapDispatchToProps = (dispatch) => ({
  addTodoAction: (category, text) => dispatch(addTodo(category, text)),
});

const todoListMapStateToProps = (state) => ({
  category: state.selectedCategory,
  todos: state.categories[state.selectedCategory] || [],
});

const todoListMapDispatchToProps = (dispatch) => ({
  toggleTodoAction: (category, id) => dispatch(toggleTodo(category, id)),
  deleteTodoAction: (category, id) => dispatch(deleteTodo(category, id)),
});

const ConnectedTodoForm = connect(formMapStateToProps, formMapDispatchToProps)(TodoForm);
const ConnectedTodoList = connect(todoListMapStateToProps, todoListMapDispatchToProps)(TodoList);

function ExerciseTwo() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', background: '#fff', borderRadius: '14px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginTop: 0 }}>Exercise 2: Todo List with Categories</h2>
      <Provider store={store}>
        <div>
          <ConnectedCategoryTabs />
          <ConnectedTodoForm />
          <ConnectedTodoList />
        </div>
      </Provider>
    </div>
  );
}

export default ExerciseTwo;
