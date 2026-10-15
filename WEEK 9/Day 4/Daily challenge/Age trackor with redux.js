import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

export const ageUpAsync = createAsyncThunk('age/ageUp', async () => {
  await delay(1000);
  return 1;
});

export const ageDownAsync = createAsyncThunk('age/ageDown', async () => {
  await delay(1000);
  return 1;
});

const ageSlice = createSlice({
  name: 'age',
  initialState: {
    age: 25,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.age += action.payload;
        state.loading = false;
      })
      .addCase(ageUpAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.age = Math.max(0, state.age - action.payload);
        state.loading = false;
      })
      .addCase(ageDownAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const store = configureStore({
  reducer: {
    age: ageSlice.reducer,
  },
});