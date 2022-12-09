import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSocialLogin: builder.query({
      query: ({ social, token }: { social: string; token: string }) => ({
        url: `/oauth2/authorization/${social}?code=${token}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useGetSocialLoginQuery } = authApi;
