import { UserType } from '@/types/userType';
import { baseApi } from './baseApi';

interface Image {
  imageUrl: string;
}

export interface User {
  key: string;
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  images: Image[];
}

interface ApiResponse {
  message: string;
  statusCode: string;
}

interface LoginResponse {
  statusCode: number;
  accessToken: string;
  refreshToken: string;
  name: string;
  nickname: string;
  images: Image[];
}

type LoginRequest = Pick<User, 'email' | 'password'>;

type PasswordChangeRequest = {
  email: string;
  prePassword: string;
  password: string;
  confirmPassword: string;
};

type Email = Pick<User, 'email'>;

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    socialLogin: builder.mutation({
      query: (email: string) => ({
        url: '/members/oauth2/info',
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/members/auth/logout',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<LoginResponse, string>({
      query: () => ({
        url: '/members/auth/login',
        method: 'POST',
      }),
    }),
    findPasswordSendEmail: builder.mutation<ApiResponse, Email>({
      query: (email: Email) => ({
        url: '/members/profiles/password/send-email',
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    findPasswordValidateEmail: builder.query<ApiResponse, string>({
      query: key => ({
        url: `/members/profiles/password?key=${key}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    changePasswordRequest: builder.mutation<ApiResponse, PasswordChangeRequest>({
      query: ({ email, prePassword, password, confirmPassword }) => ({
        url: `/members/profiles/password`,
        method: 'POST',
        body: { email, prePassword, password, confirmPassword },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSocialLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useFindPasswordSendEmailMutation,
  useFindPasswordValidateEmailQuery,
  useChangePasswordRequestMutation,
} = authApi;
