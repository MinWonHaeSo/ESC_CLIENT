import { baseApi } from './baseApi';

export interface Notification {
  id: number;
  url: string;
  message: string;
  read: boolean;
  createdAt: number[];
  unReadCount: number;
}

interface NotificationState {
  content: Notification[];
}

interface GetUnreadNotificationResponse {
  cnt: number;
  result: boolean;
}

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query<NotificationState, string>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
    }),
    getUnreadNotification: builder.query<GetUnreadNotificationResponse, string>({
      query: () => ({
        url: '/notifications/unread',
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    readNotification: builder.mutation({
      query: (notificationId: number) => ({
        url: `/notifications/${notificationId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useGetUnreadNotificationQuery, useReadNotificationMutation } = authApi;
