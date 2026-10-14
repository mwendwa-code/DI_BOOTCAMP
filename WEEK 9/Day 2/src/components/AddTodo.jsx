import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../Exercise xp.js';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    dispatch(addTodo(trimmedText));
    setText('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-todo">
        New task
      </label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
        maxLength={160}
      />
      <button type="submit" aria-label="Add task">
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  );
}
