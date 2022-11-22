import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { testSliceReducer } from './testSlice';

export const store = configureStore({
  reducer: {
    testSlice: testSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
