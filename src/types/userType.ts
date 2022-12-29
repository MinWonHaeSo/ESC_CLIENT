export interface BaseUserType {
  key: string;
  type: UserType;
  email: string;
  name: string;
  password: string;
  nickname: string;
  image: string;
}
export type UserType = 'USER' | 'MANAGER';

export type EmailType = Pick<BaseUserType, 'email'>;

export type LoginParamsType = Pick<BaseUserType, 'email' | 'password' | 'type'>;
