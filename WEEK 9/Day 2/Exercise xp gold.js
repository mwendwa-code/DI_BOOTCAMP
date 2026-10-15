import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_CATEGORY = "SELECT_CATEGORY";

const initialState = {
  selectedCategory: "work",
  categories: {
    work: [
      { id: 1, text: "Finish dashboard design", completed: false },
      { id: 2, text: "Send project update", completed: true },
    ],
    personal: [
      { id: 3, text: "Go to the gym", completed: false },
      { id: 4, text: "Call mom", completed: true },
    ],
    shopping: [
      { id: 5, text: "Buy milk", completed: false },
      { id: 6, text: "Get new headphones", completed: false },
    ],
  },
};

export const addTodo = (category, text) => ({
  type: ADD_TODO,
  payload: { category, text },
});

export const toggleTodo = (category, id) => ({
  type: TOGGLE_TODO,
  payload: { category, id },
});

export const deleteTodo = (category, id) => ({
  type: DELETE_TODO,
  payload: { category, id },
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category,
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { category, text } = action.payload;

      if (!category || !state.categories[category]) {
        return state;
      }

      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: [
            ...state.categories[category],
            {
              id: Date.now() + Math.random(),
              text,
              completed: false,
            },
          ],
        },
      };
    }

    case TOGGLE_TODO: {
      const { category, id } = action.payload;

      if (!state.categories[category]) {
        return state;
      }

      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: state.categories[category].map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        },
      };
    }

    case DELETE_TODO: {
      const { category, id } = action.payload;

      if (!state.categories[category]) {
        return state;
      }

      return {
        ...state,
        categories: {
          ...state.categories,
          [category]: state.categories[category].filter((todo) => todo.id !== id),
        },
      };
    }

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    default:
      return state;
  }
}

const devToolsEnhancer =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const store = createStore(todoReducer, devToolsEnhancer);

function TodoForm({ category, addTodoAction }) {
  const [text, setText] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed || !category) return;

    addTodoAction(category, trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={`Add a todo to ${category}`}
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add Todo
      </button>
    </form>
  );
}

function TodoItem({ todo, category, toggleTodoAction, deleteTodoAction }) {
  return (
    <li
      key={todo.id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodoAction(category, todo.id)}
        />
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#222",
          }}
        >
          {todo.text}
        </span>
      </label>

      <button
        onClick={() => deleteTodoAction(category, todo.id)}
        style={{
          border: "none",
          background: "#ef4444",
          color: "white",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        Remove
      </button>
    </li>
  );
}

function TodoList({ todos, category, toggleTodoAction, deleteTodoAction }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          category={category}
          toggleTodoAction={toggleTodoAction}
          deleteTodoAction={deleteTodoAction}
        />
      ))}
    </ul>
  );
}

function CategoryTabs({ categories, selectedCategory, selectCategoryAction }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => selectCategoryAction(category)}
          style={{
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid #ddd",
            background: selectedCategory === category ? "#111827" : "#fff",
            color: selectedCategory === category ? "#fff" : "#111827",
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: Object.keys(state.categories),
  selectedCategory: state.selectedCategory,
});

const mapDispatchToProps = (dispatch) => ({
  selectCategoryAction: (category) => dispatch(selectCategory(category)),
});

const ConnectedCategoryTabs = connect(mapStateToProps, mapDispatchToProps)(CategoryTabs);

const formMapStateToProps = (state) => ({
  category: state.selectedCategory,
});

const todoListMapStateToProps = (state) => ({
  category: state.selectedCategory,
  todos: state.categories[state.selectedCategory] || [],
});

const todoListMapDispatchToProps = (dispatch) => ({
  toggleTodoAction: (category, id) => dispatch(toggleTodo(category, id)),
  deleteTodoAction: (category, id) => dispatch(deleteTodo(category, id)),
});

const formMapDispatchToProps = (dispatch) => ({
  addTodoAction: (category, text) => dispatch(addTodo(category, text)),
});

const ConnectedTodoForm = connect(formMapStateToProps, formMapDispatchToProps)(TodoForm);
const ConnectedTodoList = connect(
  todoListMapStateToProps,
  todoListMapDispatchToProps
)(TodoList);

function App() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        background: "#f9fafb",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Todo List by Category</h1>
      <ConnectedCategoryTabs />
      <ConnectedTodoForm />
      <ConnectedTodoList />
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
