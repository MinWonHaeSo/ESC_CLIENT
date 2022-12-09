import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageType {
  imageUrl: string;
}

interface UserState {
  key: string;
  userType: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  images: ImageType[];
  loggedIn?: boolean;
}

const initialState: UserState = {
  key: '',
  userType: 'USER',
  email: '',
  name: '',
  password: '',
  nickname: '',
  images: [{ imageUrl: '' }],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    changeUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
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
    setImages: (state, action: PayloadAction<ImageType[]>) => {
      // state.images = action.payload;
      return { ...state, images: action.payload };
    },
  },
});

export const { setKey, changeUserType, setEmail, setName, setPassword, setNickname, setImages } = userSlice.actions;

export const userReducer = userSlice.reducer;
