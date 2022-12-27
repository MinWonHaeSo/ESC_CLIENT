import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/api/baseApi';
import { stadiumReservationReducer } from './stadiumReservationSlice';
import { searchPasswordReducer } from './searchPassWordSlice';
import { stadiumMarkerReducer } from './stadiumMarkerSlice';
import { stadiumWriteReducer } from './stadiumWriteSlice';
import { notificationReducer } from './notificationSlice';
import { stadiumReviewReducer } from './stadiumReview';
import { pagingReducer } from './pagingSlice';
import { authReducer } from './authSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    stadiumMarker: stadiumMarkerReducer,
    stadiumWrite: stadiumWriteReducer,
    searchPassword: searchPasswordReducer,
    stadiumReview: stadiumReviewReducer,
    stadiumReservation: stadiumReservationReducer,
    paging: pagingReducer,
    notification: notificationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
