import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { findPassWordReducer } from './findPassWordSlice';
import { memberTypeReducer } from './memberCheckSlice';
import { stardiumReducer } from './stardiumSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    member: memberTypeReducer,
    staridum: stardiumReducer,
    findPassWord: findPassWordReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
