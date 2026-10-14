import { useSelector } from 'react-redux';
import TodoItem from './TodoItem.jsx';

export default function TodoList() {
  const todos = useSelector((state) => state.todos.todos);

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ✓
        </span>
        <p>Your list is clear.</p>
        <span>Add a task above to get started.</span>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
