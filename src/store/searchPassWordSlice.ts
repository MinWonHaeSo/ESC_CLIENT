import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchPassWordState {
  index: number;
}

const initialState: SearchPassWordState = {
  index: 0,
};

export const searchPassWordSlice = createSlice({
  name: 'searchPassWord',
  initialState,
  reducers: {
    changeIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const { changeIndex } = searchPassWordSlice.actions;

export const searchPassWordReducer = searchPassWordSlice.reducer;
