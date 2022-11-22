import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const testSlice = createSlice({
  name: 'testSlice',
  initialState,
  reducers: {
    up: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.value = state.value + action.payload;
    },
  },
});

export const { up } = testSlice.actions;

export const testSliceReducer = testSlice.reducer;
