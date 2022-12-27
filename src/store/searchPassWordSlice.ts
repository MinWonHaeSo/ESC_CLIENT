import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchPasswordState {
  index: number;
  email: string;
  prePassword: string | null;
  newPassword: string;
  confirmPassword: string;
  hasToken: boolean;
}

type ChangeNewPassword = Omit<SearchPasswordState, 'email'>;

const initialState: SearchPasswordState = {
  index: 1,
  email: '',
  prePassword: null,
  newPassword: '',
  confirmPassword: '',
  hasToken: false,
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
      state.index = action.payload.index;
      state.prePassword = action.payload.prePassword;
      state.newPassword = action.payload.newPassword;
      state.confirmPassword = action.payload.confirmPassword;
    },
  },
});

export const { changeIndex, saveEmailTemporary, changeNewPassword } = searchPasswordSlice.actions;

export const searchPasswordReducer = searchPasswordSlice.reducer;
