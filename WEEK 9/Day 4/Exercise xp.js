import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (userId = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

      if (!response.ok) {
        return rejectWithValue(`Request failed with status ${response.status}.`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unable to fetch user data.',
      );
    }
  },
  {
    condition: (_, { getState }) => getState().users.status !== 'loading',
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Unable to fetch user data.';
      });
  },
});

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});