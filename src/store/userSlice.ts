import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: { userId: 0 },
  reducers: {
    changeUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { changeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
