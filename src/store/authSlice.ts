import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
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

type LoginType = Omit<AuthState, 'key'>;
type SocialLoginType = Omit<AuthState, 'key' | 'password'>;

const initialState: AuthState = {
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
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setLogin: (state, action: PayloadAction<LoginType>) => {
      const { type, email, name, password, nickname, image, accessToken, refreshToken, loggedIn } = action.payload;
      state.type = type;
      state.email = email;
      state.name = name;
      state.password = password;
      state.nickname = nickname;
      state.image = image;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loggedIn = loggedIn;
    },
    setSocialLogin: (state, action: PayloadAction<SocialLoginType>) => {
      const { type, email, name, nickname, image, accessToken, refreshToken, loggedIn } = action.payload;
      state.type = type;
      state.email = email;
      state.name = name;
      state.nickname = nickname;
      state.image = image;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loggedIn = loggedIn;
    },
    sustainLogin: (state, action) => {
      const { type, email, nickname, image, accessToken, loggedIn } = action.payload;
      state.type = type;
      state.email = email;
      state.nickname = nickname;
      state.image = image;
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
    loggedOut: () => initialState,
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
