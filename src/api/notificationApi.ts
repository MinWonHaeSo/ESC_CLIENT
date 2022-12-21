import { baseApi } from './baseApi';

interface NotificationState {
  id: number;
  url: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  unReadCount: number;
}

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query<NotificationState, string>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
    }),
    getUnreadNotification: builder.query({
      query: () => ({
        url: '/notifications/unread',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useGetUnreadNotificationQuery } = authApi;
