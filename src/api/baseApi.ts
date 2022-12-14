import { getCookie, setCookie } from '@/lib/utils/cookies';
import sw from '@/lib/utils/customSweetAlert';
import { loggedOut, setCredentials } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
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
  if (result.error && result.error.status === 400) {
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshToken = getCookie('refreshToken');
    console.log(refreshToken);
    const refreshResult = await baseQuery(
      {
        url: '/members/auth/refresh-token',
        method: 'POST',
        headers: {
          RefreshToken: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions,
    );
    console.log('refreshTokenResult', refreshResult);

    if (refreshResult.data) {
      const accessToken = (api.getState() as RootState).auth.accessToken;

      api.dispatch(setCredentials({ accessToken: accessToken }));

      // setCookie('refreshToken', refreshResult.data);

      console.log('accessToken is refetched');

      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(
        loggedOut({
          type: 'USER',
          email: '',
          name: '',
          nickname: '',
          image: '',
          accessToken: '',
          refreshToken: '',
          loggedIn: false,
        }),
      );
      sw.toast.warn('자동 로그인 기간이 만료되어 다시 로그인이 필요합니다');
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
