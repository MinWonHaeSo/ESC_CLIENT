import { User } from '@/api/userApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: Partial<User> | null;
  token: string | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loggedIn: false,
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
    checkLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    loggedOut: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, checkLoggedIn, loggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
