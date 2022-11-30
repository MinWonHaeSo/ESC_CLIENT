import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: number;
  userType: string;
  email?: string;
  nickname?: string;
  image?: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  userId: 0,
  userType: 'user',
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
    checkLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { changeUser, checkLoggedIn } = userSlice.actions;

export const userReducer = userSlice.reducer;
