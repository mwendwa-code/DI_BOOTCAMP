import type { User } from "@shared/index";
import { ApiError, apiRequest } from "./api";
import type { AppDispatch, RootState } from "./store";
import { clearSession, setSession } from "../features/auth/authSlice";

export async function authorizedRequest<T>(
  path: string,
  getState: () => RootState,
  dispatch: AppDispatch,
  init: RequestInit = {},
): Promise<T> {
  const token = getState().auth.accessToken;
  try {
    return await apiRequest<T>(path, token, init);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401 || !token) {
      throw error;
    }
    try {
      const session = await apiRequest<{ accessToken: string; user: User }>(
        "/auth/refresh",
        null,
        { method: "POST" },
      );
      dispatch(setSession(session));
      return await apiRequest<T>(path, session.accessToken, init);
    } catch (refreshError) {
      dispatch(clearSession());
      throw refreshError;
    }
  }
}
