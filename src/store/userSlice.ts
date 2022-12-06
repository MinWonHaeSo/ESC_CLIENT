import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type UserType = 'user' | 'manager';

interface UserState {
  userId: number;
  userType: UserType;
  email?: string;
  name?: string;
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
    changeUser: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    checkLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { changeUser, checkLoggedIn } = userSlice.actions;

export const userReducer = userSlice.reducer;
