import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
