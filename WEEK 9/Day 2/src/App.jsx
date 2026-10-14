import { useSelector } from 'react-redux';
import AddTodo from './components/AddTodo.jsx';
import TodoList from './components/TodoList.jsx';

export default function App() {
  const todos = useSelector((state) => state.todos.todos);
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="page">
      <section className="todo-card" aria-labelledby="page-title">
        <header className="page-header">
          <p className="eyebrow">A little progress, every day</p>
          <h1 id="page-title">My tasks</h1>
          <p className="subtitle">Write it down. Get it done.</p>
        </header>

        <AddTodo />

        <div className="list-heading">
          <h2>Today’s list</h2>
          <span className="task-count" aria-live="polite">
            {completedCount} of {todos.length} completed
          </span>
        </div>

        <TodoList />
      </section>
      <footer className="page-footer">Your list is saved in the Redux store.</footer>
    </main>
  );
}
