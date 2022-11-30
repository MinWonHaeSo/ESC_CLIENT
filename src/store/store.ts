import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { stardiumReducer } from './stardiumSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    userslice: userReducer,
    staridum: stardiumReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
