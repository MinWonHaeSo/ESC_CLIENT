import { getCookie } from '@/lib/utils/cookies';
import { loggedOut, setCredentials } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  // [] Todo : 에러 핸들링 안됨 -> refresh token 관리 필요
  if (result.error) {
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshResult = await baseQuery({ url: '/members/auth/refresh-token', method: 'POST' }, api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ token: refreshResult.data }));
      console.log('accessToken refetch');

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({}),
});
