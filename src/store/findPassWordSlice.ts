import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FindPassWordState {
  index: number;
}

const initialState: FindPassWordState = {
  index: 0,
};

export const findPassWordSlice = createSlice({
  name: 'findPassWord',
  initialState,
  reducers: {
    changeIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const { changeIndex } = findPassWordSlice.actions;

export const findPassWordReducer = findPassWordSlice.reducer;
