import { PageType } from '@/types/pageType';
import { baseApi } from './baseApi';

export interface Notification {
  id: number;
  url: string;
  message: string;
  read: boolean;
  createdAt: number[];
}

interface GetReadNotificationState extends PageType {
  content: Notification[];
}

interface GetUnreadNotificationState extends PageType {
  content: Notification[];
}

interface CheckUnreadNotificationResponse {
  cnt: number;
  result: boolean;
}

interface ReadNotificationResponse {
  result: boolean;
}

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReadNotification: builder.query<GetReadNotificationState, string>({
      query: () => ({
        url: '/notifications/read',
        method: 'GET',
      }),
    }),
    getUnreadNotification: builder.query<GetUnreadNotificationState, string>({
      query: () => ({
        url: `/notifications/unread`,
        method: 'GET',
      }),
    }),
    checkUnreadNotification: builder.query<CheckUnreadNotificationResponse, string>({
      query: () => ({
        url: '/notifications/check/unread',
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    readNotification: builder.mutation<ReadNotificationResponse, number>({
      query: (notificationId: number) => ({
        url: `/notifications/${notificationId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetReadNotificationQuery,
  useGetUnreadNotificationQuery,
  useCheckUnreadNotificationQuery,
  useReadNotificationMutation,
} = authApi;
