import { Notification, notificationApi } from '@/api/notificationApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  content: Notification[];
  currentPage: number;
  nextPage: number;
  totalPage: number;
  isLast: boolean;
  totalCount: number;
}

const initialState: NotificationState = {
  content: [],
  currentPage: 0,
  nextPage: 0,
  totalPage: 0,
  totalCount: 0,
  isLast: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification: (state, action: PayloadAction<NotificationState>) => {
      state = action.payload;
    },
    clearNotification: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(notificationApi.endpoints.getReadNotification.matchFulfilled, (state, { payload }) => {
      state.content = [...state.content, ...payload.content];
      state.currentPage = payload.number;
      state.nextPage = payload.number + 1;
      state.totalPage = payload.totalPages;
      state.totalCount = payload.totalElements;
      state.isLast = payload.last;
    });
    builder.addMatcher(notificationApi.endpoints.getUnreadNotification.matchFulfilled, (state, { payload }) => {
      state.content = [...state.content, ...payload.content];
      state.currentPage = payload.number;
      state.nextPage = payload.number + 1;
      state.totalPage = payload.totalPages;
      state.totalCount = payload.totalElements;
      state.isLast = payload.last;
    });
  },
});

export const { getNotification, clearNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
