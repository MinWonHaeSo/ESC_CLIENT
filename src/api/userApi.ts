import { UserType } from '@/store/userSlice';
import { baseApi } from './baseApi';

interface Image {
  imageUrl: string;
}

export interface User {
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  key: string;
  images: Image[];
}

export interface SignUpResponse {
  name: string;
  images: Image[];
}

type SignUpRequest = User;

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  name: string;
  images: Image[];
}

type LoginRequest = Pick<User, 'email' | 'password'>;

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserList: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/members/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: () => ({
        url: `/members/auth/signup`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserListQuery, useLoginMutation, useSignUpMutation } = userApi;
