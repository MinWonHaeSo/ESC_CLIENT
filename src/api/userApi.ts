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

interface Response {
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

type SignUpRequest = User;

type Email = Pick<User, 'email'>;

const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (userData: User) => ({
        url: `/members/signup`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    emailDoubleCheck: builder.mutation<Response, Email>({
      query: (email: Email) => ({
        url: '/members/email-dup',
        method: 'POST',
        body: email,
      }),
      transformResponse: (response: { data: Response }) => response.data,
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    sendEmailValidateCode: builder.mutation<Response, Email>({
      query: (email: Email) => ({
        url: `/members/email-auth`,
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    checkEmailValidate: builder.query<{ statusCode: number; error: string; message: string }, string>({
      query: (key: string) => ({
        url: `/members/email-authentication/?key=${key}`,
        method: 'GET',
      }),
      providesTags: ['User'],
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
  useCheckEmailValidateQuery,
  useSignOutMutation,
} = userApi;
