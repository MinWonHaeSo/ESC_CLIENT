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
  accessToken: string;
  refreshToken: string;
  loggedIn: boolean;
}

type LoginType = Omit<UserState, 'key'>;
type SocialLoginType = Omit<UserState, 'key' | 'password'>;

const initialState: UserState = {
  key: '',
  type: 'USER',
  email: '',
  name: '',
  password: '',
  nickname: '',
  image: '',
  accessToken: '',
  refreshToken: '',
  loggedIn: false,
};

// 로그인,
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setLogin: (state, action: PayloadAction<LoginType>) => {
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loggedIn = action.payload.loggedIn;
    },
    setSocialLogin: (state, action: PayloadAction<SocialLoginType>) => {
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.image = action.payload.image;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loggedIn = action.payload.loggedIn;
    },
    sustainLogin: (state, action) => {
      const { type, email, nickname, imgUrl, accessToken, loggedIn } = action.payload;
      state.type = type;
      state.email = email;
      state.nickname = nickname;
      state.image = imgUrl;
      state.accessToken = accessToken;
      state.loggedIn = loggedIn;
    },
    changeUserType: (state, action: PayloadAction<UserType>) => {
      state.type = action.payload;
    },
    uploadImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    changeNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
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

export const {
  setCredentials,
  setLogin,
  setSocialLogin,
  sustainLogin,
  changeUserType,
  uploadImage,
  changeNickname,
  changePassword,
  checkLoggedIn,
  loggedOut,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
