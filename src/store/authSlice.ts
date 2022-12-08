import { User } from '@/api/userApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: Partial<User> | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: Partial<User>; token: string }>) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;
