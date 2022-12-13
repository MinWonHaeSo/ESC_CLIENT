import { baseApi } from '@/api/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './authSlice';
import { searchPasswordReducer } from './searchPassWordSlice';
import { stadiumReducer } from './stadiumSlice';
import { stadiumWriteReducer } from './stadiumWriteSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    stadium: stadiumReducer,
    stadiumWrite: stadiumWriteReducer,
    searchPassword: searchPasswordReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
