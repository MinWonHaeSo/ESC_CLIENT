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
  statusCode: number;
  name: string;
  images: Image[];
}

type SignUpRequest = User;

interface LoginResponse {
  statusCode: number;
  accessToken: string;
  refreshToken: string;
  name: string;
  images: Image[];
}

type LoginRequest = Pick<User, 'email' | 'password'>;


type Email = Pick<User, 'email'>;

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
      query: (userData: User) => ({
        url: `/members/signUp`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    emailDoubleCheck: builder.mutation<{ statusCode: number; message: string }, Email>({
      query: (email: Email) => ({
        url: '/members/email-dup',
        method: 'POST',
        body: email,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    sendEmailValidateCode: builder.mutation<{ statusCode: number; message: string }, Email>({
      query: (email: Email) => ({
        url: `/members/email-auth`,
        method: 'POST',
        body: email,
      }),
      invalidatesTags: ['User'],
    }),
    checkEmailValidate: builder.query<{ statusCode: number; error: string; message: string }, Email>({
      query: () => ({
        url: `/members/email-auth?key={email auth key}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserListQuery,
  useLoginMutation,
  useSignUpMutation,
  useEmailDoubleCheckMutation,
  useSendEmailValidateCodeMutation,
  useCheckEmailValidateQuery,
} = userApi;
