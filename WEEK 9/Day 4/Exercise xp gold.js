import { configureStore, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { dispatch }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}.`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('The todos response was not a list.');
    }

    const todos = data.map(({ id, title, completed }) => ({
      id,
      title,
      completed: Boolean(completed),
    }));

    dispatch(setTodos(todos));
    return todos;
  },
  {
    condition: (_, { getState }) => getState().todos.status !== 'loading',
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },
    removeTodo(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setTodos(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to fetch todos.';
      });
  },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todosSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});