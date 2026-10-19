import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DataState } from '../types/types'

const initialState: DataState = {
  items: [],
  status: 'idle',
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchStarted(state) {
      state.items = []
      state.status = 'loading'
      state.error = null
    },
    dataReceived(state, action: PayloadAction<unknown[]>) {
      state.items = action.payload
      state.status = 'succeeded'
      state.error = null
    },
    fetchFailed(state, action: PayloadAction<string>) {
      state.items = []
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { fetchStarted, dataReceived, fetchFailed } = dataSlice.actions
export default dataSlice.reducer
