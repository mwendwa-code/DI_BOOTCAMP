import { useDispatch, useSelector } from 'react-redux';
import AddTodo from './components/AddTodo.jsx';
import TodoList from './components/TodoList.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Inventory from './components/Inventory.jsx';
import { setSelectedDate } from '../Exercise xp.js';

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const getDateOffset = (dateString, offset) => {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const tasks = useSelector((state) => state.planner.tasks[selectedDate] || []);
  const completedCount = tasks.filter((task) => task.completed).length;

  if (!isAuthenticated) {
    return (
      <main className="page">
        <section className="todo-card auth-card" aria-labelledby="page-title">
          <header className="page-header">
            <p className="eyebrow">Redux Toolkit exercise</p>
            <h1 id="page-title">Welcome</h1>
            <p className="subtitle">Sign in to open your daily planner.</p>
          </header>
          <Login />
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="todo-card" aria-labelledby="page-title">
        <header className="page-header">
          <div className="authenticated-header">
            <div>
              <p className="eyebrow">Daily planner</p>
              <h1 id="page-title">My plan</h1>
              <p className="subtitle">Organize the day, one task at a time.</p>
            </div>
            <div className="user-session">
              <span>Signed in as {user?.name}</span>
              <Logout />
            </div>
          </div>
        </header>

        <div className="date-picker" aria-label="Date picker">
          <button type="button" onClick={() => dispatch(setSelectedDate(getDateOffset(selectedDate, -1)))}>
            ←
          </button>
          <input
            className="date-input"
            type="date"
            value={selectedDate}
            onChange={(event) => dispatch(setSelectedDate(event.target.value || selectedDate))}
            aria-label="Select date"
          />
          <button type="button" onClick={() => dispatch(setSelectedDate(getDateOffset(selectedDate, 1)))}>
            →
          </button>
        </div>

        <AddTodo />

        <div className="list-heading">
          <h2>{formatDate(selectedDate)} tasks</h2>
          <span className="task-count" aria-live="polite">
            {completedCount} of {tasks.length} completed
          </span>
        </div>

        <TodoList />
        <Inventory />
      </section>
    </main>
  );
}
