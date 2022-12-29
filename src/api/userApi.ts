import { BaseUserType, EmailType } from '@/types/userType';
import { baseApi } from './baseApi';

interface EmailResponse {
  message: string;
  statusCode: number;
  error?: string;
}

export interface SignUpResponse {
  statusCode: number;
  name: string;
  nickname: string;
  image: string;
}

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, BaseUserType>({
      query: userData => ({
        url: `/members/signup`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    emailDoubleCheck: builder.mutation<EmailResponse, EmailType>({
      query: email => ({
        url: '/members/email-dup',
        method: 'POST',
        body: email,
      }),
    }),
    sendEmailValidateCode: builder.mutation<EmailResponse, EmailType>({
      query: email => ({
        url: `/members/email-auth`,
        method: 'POST',
        body: email,
      }),
    }),
    checkEmailValidate: builder.mutation<EmailResponse, string>({
      query: key => ({
        url: `/members/email-authentication`,
        method: 'POST',
        body: { key },
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: `/members/profiles/info`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useEmailDoubleCheckMutation,
  useSendEmailValidateCodeMutation,
  useCheckEmailValidateMutation,
  useSignOutMutation,
} = userApi;
