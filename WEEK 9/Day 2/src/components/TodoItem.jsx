import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask } from '../../Exercise xp.js';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  const handleDelete = () => {
    dispatch(deleteTask({ date: selectedDate, id: todo.id }));
  };

  const handleEdit = () => {
    const updatedText = window.prompt('Edit task', todo.text);
    if (updatedText === null) return;

    const trimmedText = updatedText.trim();
    if (!trimmedText) return;

    dispatch(editTask({ date: selectedDate, id: todo.id, text: trimmedText }));
  };

  return (
    <li className={`todo-item${todo.completed ? ' is-complete' : ''}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            const nextCompleted = !todo.completed;
            dispatch(editTask({ date: selectedDate, id: todo.id, text: todo.text, completed: nextCompleted }));
          }}
          aria-label={`${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}: ${todo.text}`}
        />
        <span className="checkmark" aria-hidden="true">
          {todo.completed ? '✓' : ''}
        </span>
        <span className="todo-text">{todo.text}</span>
      </label>
      <div className="task-actions">
        <button className="edit-button" type="button" onClick={handleEdit} aria-label={`Edit ${todo.text}`}>
          Edit
        </button>
        <button
          className="remove-button"
          type="button"
          onClick={handleDelete}
          aria-label={`Remove ${todo.text}`}
          title="Remove task"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </li>
  );
}
