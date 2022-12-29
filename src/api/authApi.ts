import { EmailType, LoginParamsType, UserType } from '@/types/userType';
import { baseApi } from './baseApi';

interface BaseApiResponse {
  message: string;
  statusCode: number;
  errorMessage?: string;
}

interface LoginResponse {
  id: string;
  name: string;
  nickname: string;
  imgUrl: string;
  type: UserType;
  accessToken: string;
  refreshToken: string;
  statusCode: number;
}

interface RefetchUserResponse extends Omit<LoginResponse, 'type' | 'accessToken' | 'refreshToken'> {
  email: string;
}

interface ChangeUserInfoResponse extends BaseApiResponse {
  imgUrl: string;
  nickname: string;
}

interface PasswordChangeRequest {
  email: string;
  prePassword: string | null;
  newPassword: string;
  confirmPassword: string;
  hasToken: boolean;
}

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    socialLogin: builder.mutation({
      query: (email: EmailType) => ({
        url: '/members/oauth2/info',
        method: 'POST',
        body: email,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginParamsType>({
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
      query: () => ({
        url: 'members/profiles/info',
        method: 'POST',
      }),
    }),
    changeUserInfo: builder.mutation<ChangeUserInfoResponse, { nickname: string; imgUrl: string }>({
      query: userInfo => ({
        url: 'members/profiles/info',
        method: 'PATCH',
        body: { ...userInfo },
      }),
    }),
    searchPasswordSendEmail: builder.mutation<BaseApiResponse, EmailType>({
      query: email => ({
        url: '/members/profiles/password/send-email',
        method: 'POST',
        body: email,
      }),
    }),
    searchPasswordValidateEmail: builder.mutation<BaseApiResponse, string>({
      query: key => ({
        url: `/members/profiles/password/config`,
        method: 'POST',
        body: { key },
      }),
    }),
    changePasswordRequest: builder.mutation<BaseApiResponse, PasswordChangeRequest>({
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
