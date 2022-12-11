import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageType {
  imageUrl: string;
}

interface UserState {
  key: string;
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  image: string;
  accessToken: string | null;
  refreshToken: string | null;
  loggedIn: boolean;
}

type LoginType = Omit<UserState, 'key' | 'password'>;

const initialState: UserState = {
  key: '',
  type: 'USER',
  email: '',
  name: '',
  password: '',
  nickname: '',
  image: '',
  accessToken: null,
  refreshToken: null,
  loggedIn: false,
};

// 로그인,
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.accessToken = token;
    },
    setLogin: (state, action: PayloadAction<LoginType>) => {
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loggedIn = action.payload.loggedIn;
    },
    setSocialLogin: (state, action: PayloadAction<LoginType>) => {
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loggedIn = action.payload.loggedIn;
    },
    changeUserType: (state, action: PayloadAction<UserType>) => {
      state.type = action.payload;
    },
    uploadImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    checkLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    loggedOut: (state, action) => {
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export const { setCredentials, setLogin, changeUserType, uploadImage, checkLoggedIn, loggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
