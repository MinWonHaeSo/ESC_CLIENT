import React, { useState, useCallback } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import sw from '@/lib/utils/customSweetAlert';
import { RootState, useAppDispatch } from '@/store/store';
import { setLogin } from '@/store/authSlice';
import { setCredentials } from '@/store/authSlice';
import { useNavigate } from 'react-router';
import Input from '../common/atoms/Input';
import Button from '../common/atoms/Button';
import { useSelector } from 'react-redux';
import { useLoginMutation } from '@/api/authApi';
import { checkEmailValidation, checkPassWordValidation } from './formValidation';
import { getCookie, setCookie } from '@/lib/utils/cookies';
import { setAuthToken } from '@/lib/utils/token';

interface LoginFormProps {}

interface InitialFormState {
  email: string;
  password: string;
}

export interface InitialRequiredState {
  email: boolean;
  password: boolean;
}

const initialFormState: InitialFormState = {
  email: '',
  password: '',
};

const initialRequiredState: InitialRequiredState = {
  email: false,
  password: false,
};

const LoginForm = (props: LoginFormProps) => {
  const [formState, setFormState] = useState<InitialFormState>(initialFormState);
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { email, password } = formState;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userType = useSelector((state: RootState) => state.user.type);

  const [loginAPI] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await loginAPI({ email: email, password: password }).unwrap();
      if (userData) {
        const { name, nickname, imgUrl, accessToken, refreshToken } = userData;

        // cookie에 refreshToken 저장
        setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
        });

        // localStorage에 accessToken 저장
        setAuthToken(accessToken);
        localStorage.setItem('userType', userType);

        // redux store - 전역 상태에 저장
        dispatch(
          setLogin({
            type: userType,
            email: email,
            name: name,
            password: password,
            nickname: nickname,
            image: imgUrl,
            accessToken: accessToken,
            refreshToken: refreshToken,
            loggedIn: true,
          }),
        );
        sw.toast.success('로그인 되었습니다.');
        navigate('/');
      }
    } catch {
      sw.toast.error('입력한 정보를 다시 확인해 주세요.');
      return navigate('/login');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
    if (id === 'email') {
      checkEmailValidation(value, setLoaded, setRequired, required);
    } else if (id === 'password') {
      checkPassWordValidation(value, setLoaded, setRequired, required);
    }
  };

  const handleButtonClick = () => {
    if (formState.email.length === 0) {
      return sw.toast.warn('이메일을 입력해주세요');
    }
    if (required.email) {
      return sw.toast.warn('이메일을 올바르게 입력해주세요.');
    }
    if (required.password) {
      return sw.toast.warn('비밀번호를 바르게 입력해주세요.');
    }
    if (!loaded) {
      return;
    }
  };

  return (
    <FormBlock onSubmit={handleSubmit}>
      <Input
        type={'text'}
        value={email}
        id={'email'}
        placeholder={'아이디(이메일)'}
        onChange={handleFormChange}
        required={required.email}
      />
      <Input
        type={'password'}
        value={password}
        id={'password'}
        placeholder={'비밀번호'}
        onChange={handleFormChange}
        required={required.password}
        autoComplete="off"
      />
      <Button
        type={'submit'}
        size={'large'}
        backgroundColor={loaded ? `${palette.black[100]}` : `${palette.grey[200]}`}
        onClick={handleButtonClick}
      >
        로그인
      </Button>
    </FormBlock>
  );
};

export default LoginForm;

const FormBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
`;
