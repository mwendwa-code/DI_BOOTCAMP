import { useSelector } from 'react-redux';
import TodoItem from './TodoItem.jsx';

export default function TodoList() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const tasks = useSelector((state) => state.planner.tasks[selectedDate] || []);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ✓
        </span>
        <p>No tasks for this day.</p>
        <span>Add a task to plan your day.</span>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Todo list">
      {tasks.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
