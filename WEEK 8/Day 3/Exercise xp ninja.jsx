import React, { createContext, useContext, useReducer, useState } from 'react';

const TaskContext = createContext(null);

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, action.task];
    case 'toggle':
      return tasks.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case 'remove':
      return tasks.filter((task) => task.id !== action.id);
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function AddTask() {
  const { dispatch } = useContext(TaskContext);
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskText = text.trim();

    if (!taskText) {
      return;
    }

    dispatch({
      type: 'add',
      task: {
        id: crypto.randomUUID(),
        text: taskText,
        completed: false
      }
    });
    setText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
      />
      <button className="theme-button" type="submit" disabled={!text.trim()}>
        Add task
      </button>
    </form>
  );
}

function TaskList() {
  const { tasks, dispatch } = useContext(TaskContext);

  if (tasks.length === 0) {
    return <p className="todo-empty">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li className="task-item" key={task.id}>
          <label className={task.completed ? 'task-label completed' : 'task-label'}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch({ type: 'toggle', id: task.id })}
            />
            <span>{task.text}</span>
          </label>
          <button
            className="remove-todo"
            type="button"
            onClick={() => dispatch({ type: 'remove', id: task.id })}
            aria-label={`Remove ${task.text}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

function TaskManager() {
  return (
    <TaskProvider>
      <section className="exercise-card task-card" aria-labelledby="task-heading">
        <div>
          <p className="eyebrow">Exercise 4</p>
          <h2 id="task-heading">Task manager</h2>
          <p>Add tasks, mark them complete, or remove them.</p>
          <AddTask />
          <TaskList />
        </div>
      </section>
    </TaskProvider>
  );
}

export default TaskManager;