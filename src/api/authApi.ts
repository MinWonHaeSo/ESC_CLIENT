import { UserType } from '@/types/userType';
import { baseApi } from './baseApi';

export interface User {
  key: string;
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  image: string;
}

interface ApiResponse {
  message: string;
  statusCode: number;
}

interface LoginResponse {
  statusCode: number;
  accessToken: string;
  refreshToken: string;
  id: number;
  name: string;
  nickname: string;
  imgUrl: string;
}

interface RefreshResponse {
  statusCode: number;
  accessToken: string;
  refreshToken: string;
}

interface RefetchUserResponse {
  id: number;
  email: string;
  name: string;
  nickname: string;
  imgUrl: string;
  password: string;
  statusCode: number;
}

interface ChangeUserInfoResponse {
  message: string;
  statusCode: number;
  nickname: string;
  imgUrl: string;
}

type LoginRequest = Pick<User, 'email' | 'password' | 'type'>;

type PasswordChangeRequest = {
  email: string;
  prePassword: string | null;
  newPassword: string;
  confirmPassword: string;
  hasToken: boolean;
};

type Email = Pick<User, 'email'>;

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    socialLogin: builder.mutation({
      query: (email: Email) => ({
        url: '/members/oauth2/info',
        method: 'POST',
        body: email,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: '/members/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation<LoginResponse, string>({
      query: (refreshToken: string) => ({
        url: '/members/auth/logout',
        method: 'POST',
        headers: {
          RefreshToken: `Bearer ${refreshToken}`,
        },
      }),
    }),
    refetchUserInfo: builder.mutation<RefetchUserResponse, string>({
      query: (refreshToken: string) => ({
        url: 'members/profiles/info',
        method: 'POST',
        headers: {
          RefreshToken: `Bearer ${refreshToken}`,
        },
      }),
    }),
    changeUserInfo: builder.mutation<ChangeUserInfoResponse, { nickname: string; imgUrl: string }>({
      query: userInfo => ({
        url: 'members/profiles/info',
        method: 'PATCH',
        body: { ...userInfo },
      }),
    }),
    searchPasswordSendEmail: builder.mutation<ApiResponse, Email>({
      query: (email: Email) => ({
        url: '/members/profiles/password/send-email',
        method: 'POST',
        body: email,
      }),
    }),
    searchPasswordValidateEmail: builder.mutation<ApiResponse, string>({
      query: key => ({
        url: `/members/profiles/password/config`,
        method: 'POST',
        body: { key },
      }),
    }),
    changePasswordRequest: builder.mutation<ApiResponse, PasswordChangeRequest>({
      query: ({ email, prePassword, newPassword, confirmPassword, hasToken }) => ({
        url: `/members/profiles/password`,
        method: 'POST',
        body: { email, prePassword, newPassword, confirmPassword, hasToken },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSocialLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefetchUserInfoMutation,
  useChangeUserInfoMutation,
  useSearchPasswordSendEmailMutation,
  useSearchPasswordValidateEmailMutation,
  useChangePasswordRequestMutation,
} = authApi;
