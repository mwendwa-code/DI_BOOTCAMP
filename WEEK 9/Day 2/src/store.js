import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from '../Exercise xp.js';
import authReducer from '../Exercise xp gold.js';
import inventoryReducer from '../Exercise xp ninja.js';

export const store = configureStore({
  reducer: {
    planner: plannerReducer,
    auth: authReducer,
    inventory: inventoryReducer,
  },
});
