import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";

const initialState = {
  todos: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Practice Redux", completed: true },
  ],
};

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now() + Math.random(),
    text,
    completed: false,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
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

function TodoForm({ addTodoAction }) {
  const [text, setText] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!text.trim()) return;

    addTodoAction(text.trim());
    setText("");
  };

  return React.createElement(
    "form",
    {
      onSubmit: handleSubmit,
      style: { display: "flex", gap: "10px", marginBottom: "20px" },
    },
    [
      React.createElement("input", {
        key: "todo-input",
        type: "text",
        value: text,
        onChange: (event) => setText(event.target.value),
        placeholder: "Add a new todo",
        style: {
          flex: 1,
          padding: "10px 12px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        },
      }),
      React.createElement(
        "button",
        {
          key: "todo-submit",
          type: "submit",
          style: {
            padding: "10px 16px",
            border: "none",
            borderRadius: "8px",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
          },
        },
        "Add Todo"
      ),
    ]
  );
}

function TodoItem({ todo, toggleTodoAction, deleteTodoAction }) {
  return React.createElement(
    "li",
    {
      key: todo.id,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #eee",
      },
    },
    [
      React.createElement(
        "label",
        {
          key: "todo-label",
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            cursor: "pointer",
          },
        },
        [
          React.createElement("input", {
            key: "todo-check",
            type: "checkbox",
            checked: todo.completed,
            onChange: () => toggleTodoAction(todo.id),
          }),
          React.createElement(
            "span",
            {
              key: "todo-text",
              style: {
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#222",
              },
            },
            todo.text
          ),
        ]
      ),
      React.createElement(
        "button",
        {
          key: "todo-delete",
          onClick: () => deleteTodoAction(todo.id),
          style: {
            border: "none",
            background: "#ef4444",
            color: "white",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
          },
        },
        "Remove"
      ),
    ]
  );
}

function TodoList({ todos, toggleTodoAction, deleteTodoAction }) {
  return React.createElement(
    "ul",
    {
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0,
      },
    },
    todos.map((todo) =>
      React.createElement(TodoItem, {
        key: todo.id,
        todo,
        toggleTodoAction,
        deleteTodoAction,
      })
    )
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  addTodoAction: (text) => dispatch(addTodo(text)),
  toggleTodoAction: (id) => dispatch(toggleTodo(id)),
  deleteTodoAction: (id) => dispatch(deleteTodo(id)),
});

const ConnectedTodoForm = connect(null, mapDispatchToProps)(TodoForm);
const ConnectedTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

function App() {
  return React.createElement(
    "div",
    {
      style: {
        maxWidth: "500px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        background: "#f9fafb",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        fontFamily: "Arial, sans-serif",
      },
    },
    [
      React.createElement(
        "h1",
        { key: "title", style: { marginBottom: "20px" } },
        "Todo List"
      ),
      React.createElement(ConnectedTodoForm, { key: "form" }),
      React.createElement(ConnectedTodoList, { key: "list" }),
    ]
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  React.createElement(
    Provider,
    { store },
    React.createElement(App)
  )
);
