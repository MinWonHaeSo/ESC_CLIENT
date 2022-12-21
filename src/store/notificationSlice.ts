import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  id: number;
  url: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const initialState: NotificationState[] = [
  {
    id: 0,
    url: '',
    message: '',
    isRead: false,
    createdAt: '',
  },
];

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification: (state, action: PayloadAction<NotificationState[]>) => {
      state = action.payload;
    },
  },
});

export const { getNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
