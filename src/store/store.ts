import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { stardiumReducer } from './stardiumSlice';
import { stardiumWriteReducer } from './stardiumWriteSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    stardium: stardiumReducer,
    stardiumWrite: stardiumWriteReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
