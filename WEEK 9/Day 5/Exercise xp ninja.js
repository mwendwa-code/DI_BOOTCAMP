import React, { useCallback, useState } from 'react';
import { configureStore, createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  todos: [
    { id: 'todo-1', text: 'Review today’s priorities', completed: false },
    { id: 'todo-2', text: 'Finish the project outline', completed: true },
    { id: 'todo-3', text: 'Take a short break', completed: false },
  ],
  visibilityFilter: 'All',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.push(action.payload);
      },
      prepare(text) {
        return { payload: { id: nanoid(), text, completed: false } };
      },
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setVisibilityFilter(state, action) {
      if (['All', 'Active', 'Completed'].includes(action.payload)) {
        state.visibilityFilter = action.payload;
      }
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setVisibilityFilter } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export const selectVisibilityFilter = (state) => state.todos.visibilityFilter;

export const selectTodos = createSelector(
  [(state) => state.todos.todos, selectVisibilityFilter],
  (todos, visibilityFilter) => {
    if (visibilityFilter === 'Active') return todos.filter((todo) => !todo.completed);
    if (visibilityFilter === 'Completed') return todos.filter((todo) => todo.completed);
    return todos;
  },
);

export const selectFilteredTodosCount = createSelector(
  [selectTodos],
  (todos) => todos.length,
);

const filters = ['All', 'Active', 'Completed'];
const buttonStyle = {
  border: '1px solid #cbd2dc',
  borderRadius: '6px',
  padding: '8px 12px',
  background: '#fff',
  font: 'inherit',
  cursor: 'pointer',
};

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const visibilityFilter = useSelector(selectVisibilityFilter);
  const filteredCount = useSelector(selectFilteredTodosCount);
  const [newTodoText, setNewTodoText] = useState('');

  const handleToggle = useCallback((id) => {
    dispatch(toggleTodo(id));
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(removeTodo(id));
  }, [dispatch]);

  const handleAddTodo = useCallback((event) => {
    event.preventDefault();
    const text = newTodoText.trim();
    if (!text) return;

    dispatch(addTodo(text));
    setNewTodoText('');
  }, [dispatch, newTodoText]);

  return React.createElement(
    'main',
    { style: { maxWidth: '700px', margin: '40px auto', padding: '0 20px', color: '#202938', fontFamily: 'Arial, sans-serif' } },
    React.createElement('h1', null, 'Todo List'),
    React.createElement(
      'form',
      { onSubmit: handleAddTodo, style: { display: 'flex', gap: '8px', margin: '20px 0' } },
      React.createElement('label', { htmlFor: 'new-todo', style: { position: 'absolute', left: '-10000px' } }, 'New todo'),
      React.createElement('input', {
        id: 'new-todo',
        type: 'text',
        value: newTodoText,
        onChange: (event) => setNewTodoText(event.target.value),
        placeholder: 'What needs to be done?',
        required: true,
        style: { ...buttonStyle, flex: '1 1 auto', textAlign: 'left' },
      }),
      React.createElement('button', { type: 'submit', style: { ...buttonStyle, background: '#293c5a', color: '#fff' } }, 'Add todo'),
    ),
    React.createElement(
      'nav',
      { 'aria-label': 'Filter todos', style: { display: 'flex', gap: '8px', marginBottom: '18px' } },
      ...filters.map((filter) =>
        React.createElement(
          'button',
          {
            key: filter,
            type: 'button',
            onClick: () => dispatch(setVisibilityFilter(filter)),
            'aria-pressed': visibilityFilter === filter,
            style: {
              ...buttonStyle,
              background: visibilityFilter === filter ? '#293c5a' : '#fff',
              color: visibilityFilter === filter ? '#fff' : '#202938',
            },
          },
          filter,
        ),
      ),
    ),
    React.createElement('p', { 'aria-live': 'polite', style: { color: '#667085' } }, `${filteredCount} ${visibilityFilter.toLowerCase()} todo${filteredCount === 1 ? '' : 's'}`),
    todos.length > 0
      ? React.createElement(
          'ul',
          { style: { listStyle: 'none', padding: 0, display: 'grid', gap: '10px' } },
          ...todos.map((todo) =>
            React.createElement(
              'li',
              {
                key: todo.id,
                style: { display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e0e4eb', borderRadius: '8px', padding: '12px' },
              },
              React.createElement('input', {
                type: 'checkbox',
                checked: todo.completed,
                onChange: () => handleToggle(todo.id),
                'aria-label': `${todo.completed ? 'Mark active' : 'Mark completed'}: ${todo.text}`,
              }),
              React.createElement(
                'span',
                { style: { flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#667085' : '#202938' } },
                todo.text,
              ),
              React.createElement('button', { type: 'button', onClick: () => handleDelete(todo.id), style: buttonStyle, 'aria-label': `Delete ${todo.text}` }, 'Delete'),
            ),
          ),
        )
      : React.createElement('p', { style: { color: '#667085' } }, 'No todos match this filter.'),
  );
}

export default TodoList;