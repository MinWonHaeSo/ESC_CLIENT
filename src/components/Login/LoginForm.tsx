import React, { useState, useCallback } from 'react';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import sw from '@/lib/utils/customSweetAlert';
import { RootState, useAppDispatch } from '@/store/store';
import { changeUser, checkLoggedIn } from '@/store/userSlice';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

interface LoginFormProps {}

interface InitialRequiredState {
  email: boolean;
  passWord: boolean;
}

const LoginForm = (props: LoginFormProps) => {
  const initialRequiredState: InitialRequiredState = {
    email: false,
    passWord: false,
  };
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassWord, setInputPassWord] = useState<string>('');
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);
  const [loaded, setLoaded] = useState<boolean>(false);
  const bothRequiredCheck = Object.values(required).filter(item => !item).length === 2;

  const dispatch = useAppDispatch();
  const userType = useSelector((state: RootState) => state.user.userType);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const checkEmailValidation = useCallback(
    (currentEmail: string) => {
      const { emailRegex } = formRegex;
      if (!emailRegex.test(currentEmail)) {
        return setRequired({ ...required, email: true });
      }
      setRequired({ ...required, email: false });
    },
    [required],
  );

  console.log(required);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation(currentEmail);
  }, []);

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      return setRequired({ ...required, email: true });
    }
  };

  const checkPassWordValidation = useCallback(
    (currentPassWord: string) => {
      const { passWordRegex } = formRegex;
      if (!passWordRegex.test(currentPassWord)) {
        return setRequired({ ...required, passWord: true });
      }
      setLoaded(true);
      setRequired({ ...required, passWord: false });
    },
    [required, loaded],
  );

  const handlePassWordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassWord = e.target.value;
    setInputPassWord(currentPassWord);
    checkPassWordValidation(currentPassWord);
  }, []);

  const handlePassWordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      return setRequired({ ...required, passWord: true });
    }
  };

  const handleButtonClick = () => {
    if (!bothRequiredCheck) {
      return;
    }
    dispatch(checkLoggedIn(true));
    dispatch(changeUser(userType));
    sw.toast.success('로그인 되었습니다.');
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <FormBlock onSubmit={handleSubmit}>
      <Input
        type={'text'}
        value={inputEmail}
        id={'email'}
        placeholder={'아이디(이메일)'}
        onChange={handleEmailChange}
        onKeyDown={handleEmailKeyDown}
        required={required.email}
      />
      <Input
        type={'password'}
        value={inputPassWord}
        id={'password'}
        placeholder={'비밀번호'}
        onChange={handlePassWordChange}
        onKeyDown={handlePassWordKeyDown}
        required={required.passWord}
      />
      <Button
        type={'submit'}
        size={'large'}
        backgroundColor={bothRequiredCheck && loaded ? `${palette.black[100]}` : `${palette.grey[200]}`}
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
