import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthResponse, User } from "@shared/index";
import { apiRequest } from "../../app/api";

interface Credentials {
  email: string;
  password: string;
}

interface Registration extends Credentials {
  username: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  initialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  initialized: false,
  error: null,
};

export const login = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>("/auth/login", null, {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to sign in.");
    }
  },
);

export const register = createAsyncThunk<AuthResponse, Registration, { rejectValue: string }>(
  "auth/register",
  async (details, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>("/auth/register", null, {
        method: "POST",
        body: JSON.stringify(details),
      });
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unable to create account.");
    }
  },
);

export const restoreSession = createAsyncThunk<AuthResponse | null>(
  "auth/restoreSession",
  async () => {
    try {
      return await apiRequest<AuthResponse>("/auth/refresh", null, { method: "POST" });
    } catch {
      return null;
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await apiRequest<void>("/auth/logout", null, { method: "POST" });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: { payload: AuthResponse }) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
    },
    clearSession(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
        state.initialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to sign in.";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
        state.initialized = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload ?? "Unable to create account.";
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
        state.initialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { setSession, clearSession, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
