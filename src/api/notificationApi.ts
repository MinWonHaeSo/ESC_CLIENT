import { PageType } from '@/types/pageType';
import { baseApi } from './baseApi';

export interface Notification {
  id: string;
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

export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getReadNotification: builder.query<GetReadNotificationState, string>({
      query: (page: string) => ({
        url: `/notifications/read?page=${page}&size=${5}&sort=${'createdAt'},DESC`,
        transformResponse: (response: { data: Notification }) => response.data,
        method: 'GET',
      }),
    }),
    getUnreadNotification: builder.query<GetUnreadNotificationState, string>({
      query: (page: string) => ({
        url: `/notifications/unread?page=${page}&size=${5}&sort=${'createdAt'},DESC`,
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
    readNotification: builder.mutation<ReadNotificationResponse, string>({
      query: (notificationId: string) => ({
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
} = notificationApi;
