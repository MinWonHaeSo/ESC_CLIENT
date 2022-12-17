import { deleteCookie, getCookie, setCookie } from '@/lib/utils/cookies';
import sw from '@/lib/utils/customSweetAlert';
import { getAuthToken, setAuthToken } from '@/lib/utils/token';
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
    headers.set('Content-Type', 'application/json');
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
  if (result.error && result.error.status === 404) {
    console.log('sending refresh token');

    // send refresh token to get new access token
    const refreshToken = getCookie('refreshToken');

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
    console.log('refreshTokenResult', refreshResult.data);

    if (refreshResult.data) {
      // accessToken, refreshToken 전역 상태(auth)에 저장
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // 기존 refreshToken 삭제
      deleteCookie('refreshToken');

      // 다시 받아온 refreshToken은 cookie, accessToken은 localStorage에 저장한다.
      const authUser = useSelector((state: RootState) => state.auth);
      setAuthToken(authUser.accessToken);
      setCookie('refreshToken', authUser.refreshToken);

      console.log(`redux - accessToken: ${authUser.accessToken}`);
      console.log(`localStorage - accessToken: ${getAuthToken()}`);
      console.log(`redux - refreshToken: ${authUser.refreshToken}`);
      console.log(`cookie - refreshToken: ${getCookie('refreshToken')}`);

      console.log('accessToken is refetched');

      // retry the initial query - header에 전역 상태에 있는 accessToken을 담아서 다시 API 요청
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
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
