import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchPasswordState {
  index: number;
  email: string;
  prePassword: string;
  password: string;
  confirmPassword: string;
}

type ChangeNewPassword = Omit<SearchPasswordState, 'index' | 'email'>;

const initialState: SearchPasswordState = {
  index: 0,
  email: '',
  prePassword: '',
  password: '',
  confirmPassword: '',
};

export const searchPasswordSlice = createSlice({
  name: 'searchPassword',
  initialState,
  reducers: {
    changeIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    saveEmailTemporary: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changeNewPassword: (state, action: PayloadAction<ChangeNewPassword>) => {
      state.prePassword = action.payload.prePassword;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
});

export const { changeIndex, saveEmailTemporary, changeNewPassword } = searchPasswordSlice.actions;

export const searchPasswordReducer = searchPasswordSlice.reducer;
