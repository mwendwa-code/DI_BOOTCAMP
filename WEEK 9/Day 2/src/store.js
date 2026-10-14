import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../Exercise xp.js';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
