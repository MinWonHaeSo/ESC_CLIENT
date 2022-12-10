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
  image: ImageType[];
}

const initialState: UserState = {
  key: '',
  type: 'USER',
  email: '',
  name: '',
  password: '',
  nickname: '',
  image: [{ imageUrl: '' }],
};

// signUp(회원가입) , mypage (마이페이지) -> 회원가입 시 관리되는 각 폼 요소가 개별로 존재하기 때문에,
// 각 요소마다 입력이 완료되었을 때 해당 상태가 저장되도록 reducer들을 분리할 수 밖에 없음
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
    setImage: (state, action: PayloadAction<ImageType[]>) => {
      state.image = action.payload;
    },
    setRegister: (state, action) => {
      state.key = action.payload;
      state.type = action.payload;
      state.email = action.payload;
      state.name = action.payload;
      state.password = action.payload;
      state.nickname = action.payload;
      state.image = action.payload;
    },
  },
});

export const { setKey, setUserType, setEmail, setName, setPassword, setNickname, setImage, setRegister } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
