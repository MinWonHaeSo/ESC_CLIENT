import PATH from '@/constants/path';
import { setCookie } from '@/lib/utils/cookies';
import { setAuthToken } from '@/lib/utils/token';
import { UserType } from '@/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';

interface AuthState {
  grantType?: string;
  key: string;
  id: number;
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  image: string;
  accessToken?: string;
  refreshToken: string;
  loggedIn: boolean;
}

type LoginType = Omit<AuthState, 'key'>;
type SocialLoginType = Omit<AuthState, 'key' | 'password'>;

const initialState: AuthState = {
  grantType: '',
  id: 0,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { grantType, accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.grantType = grantType;
      setAuthToken(accessToken);
      setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
      });
    },
    setLogin: (state, action: PayloadAction<LoginType>) => {
      const { id, type, email, name, password, nickname, image, accessToken, refreshToken, loggedIn } = action.payload;
      state.id = id;
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
      const { id, type, email, name, nickname, image, accessToken, refreshToken, loggedIn } = action.payload;
      state.id = id;
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
      const { id, type, email, nickname, imgUrl, accessToken, password, loggedIn } = action.payload;
      state.id = id;
      state.type = type;
      state.email = email;
      state.nickname = nickname;
      state.image = imgUrl;
      state.accessToken = accessToken;
      state.password = password;
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
