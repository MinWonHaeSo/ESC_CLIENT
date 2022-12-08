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
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    // tokenReceived: (state, action: PayloadAction<null>) => {},
    loggedOut: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, loggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
