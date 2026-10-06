import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';

const TaskContext = createContext(null);

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        )
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text: action.text } : task
        )
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id)
      };
    case 'FILTER_TASKS':
      return { ...state, filter: action.filter };
    default:
      throw new Error(`Unknown task action: ${action.type}`);
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: 'all'
  });

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
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
      type: 'ADD_TASK',
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
        required
      />
      <button className="theme-button" type="submit" disabled={!text.trim()}>
        Add task
      </button>
    </form>
  );
}

function TaskList() {
  const { tasks, filter, dispatch } = useContext(TaskContext);
  const [editingId, setEditingId] = useState(null);
  const editInputRef = useRef(null);
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  useEffect(() => {
    if (editingId !== null) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [editingId]);

  const saveTask = (id) => {
    const text = editInputRef.current?.value.trim();
    if (!text) {
      editInputRef.current?.focus();
      return;
    }

    dispatch({ type: 'EDIT_TASK', id, text });
    setEditingId(null);
  };

  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', id });
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <>
      <div className="task-filters" role="group" aria-label="Filter tasks">
        {[
          ['all', 'All'],
          ['active', 'Active'],
          ['completed', 'Completed']
        ].map(([value, label]) => (
          <button
            className={filter === value ? 'task-filter active' : 'task-filter'}
            type="button"
            key={value}
            aria-pressed={filter === value}
            onClick={() => dispatch({ type: 'FILTER_TASKS', filter: value })}
          >
            {label}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="todo-empty">No tasks yet. Add one above.</p>
      ) : visibleTasks.length === 0 ? (
        <p className="todo-empty">No {filter} tasks.</p>
      ) : (
        <ul className="todo-list">
          {visibleTasks.map((task) => (
            <li className="task-item" key={task.id}>
              {editingId === task.id ? (
                <form
                  className="task-edit-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    saveTask(task.id);
                  }}
                >
                  <label className="visually-hidden" htmlFor={`edit-task-${task.id}`}>
                    Edit task
                  </label>
                  <input
                    ref={editInputRef}
                    id={`edit-task-${task.id}`}
                    type="text"
                    defaultValue={task.text}
                    required
                  />
                  <div className="task-actions">
                    <button className="task-action" type="submit">
                      Save
                    </button>
                    <button
                      className="task-action"
                      type="button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <label className={task.completed ? 'task-label completed' : 'task-label'}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => dispatch({ type: 'TOGGLE_TASK', id: task.id })}
                    />
                    <span>{task.text}</span>
                  </label>
                  <div className="task-actions">
                    <button
                      className="task-action"
                      type="button"
                      onClick={() => setEditingId(task.id)}
                      aria-label={`Edit ${task.text}`}
                    >
                      Edit
                    </button>
                    <button
                      className="remove-todo"
                      type="button"
                      onClick={() => removeTask(task.id)}
                      aria-label={`Remove ${task.text}`}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function TaskManager() {
  return (
    <TaskProvider>
      <section className="exercise-card task-card" aria-labelledby="task-heading">
        <div>
          <p className="eyebrow">Daily challenge</p>
          <h2 id="task-heading">Task manager</h2>
          <p>Add, edit, complete, remove, and filter your tasks.</p>
          <AddTask />
          <TaskList />
        </div>
      </section>
    </TaskProvider>
  );
}

export default TaskManager;