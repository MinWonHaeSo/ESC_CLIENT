import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getToken: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getSocialLogin: builder.query({
      query: ({ social, token }: { social: string; token: string }) => ({
        url: `/oauth2/authorization/${social}?code=${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTokenQuery, useGetSocialLoginQuery } = authApi;
