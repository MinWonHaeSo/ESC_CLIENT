import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageType {
  imageUrl: string;
}

interface UserState {
  userId: number;
  userType: UserType;
  email?: string;
  name?: string;
  password?: string;
  nickname?: string;
  image?: ImageType[];
  loggedIn: boolean;
}

const initialState: UserState = {
  userId: 0,
  userType: 'USER',
  email: '',
  name: '',
  password: '',
  nickname: '',
  image: [],
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserType>) => {
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
    setImage: (state, action: PayloadAction<ImageType[]>) => {
      state.image = action.payload;
    },
    checkLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { changeUser, checkLoggedIn } = userSlice.actions;

export const userReducer = userSlice.reducer;
