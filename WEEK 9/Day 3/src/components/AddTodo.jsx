import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../Exercise xp.js';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    dispatch(addTask({ date: selectedDate, text: trimmedText }));
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
        placeholder="Add a task for this day"
        maxLength={160}
      />
      <button type="submit" aria-label="Add task">
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  );
}
