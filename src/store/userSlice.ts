import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  key: string;
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  image: string;
}

const initialState: UserState = {
  key: '',
  type: 'USER',
  email: '',
  name: '',
  password: '',
  nickname: '',
  image: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.type = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const { setKey, setUserType, setEmail, setName, setPassword, setNickname, setImage } = userSlice.actions;

export const userReducer = userSlice.reducer;
