import React, { useState, useCallback } from 'react';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import sw from '@/lib/utils/customSweetAlert';
import { RootState, useAppDispatch } from '@/store/store';
import { changeUser, checkLoggedIn } from '@/store/userSlice';
import { changeMemberType } from '@/store/memberCheckSlice';
import { useNavigate } from 'react-router';
import Input from '../common/atoms/Input';
import Button from '../common/atoms/Button';
import { useSelector } from 'react-redux';

interface LoginFormProps {}

interface InitialRequiredState {
  email: boolean;
  passWord: boolean;
}

const initialRequiredState: InitialRequiredState = {
  email: false,
  passWord: false,
};

const LoginForm = (props: LoginFormProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassWord, setInputPassWord] = useState<string>('');
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);
  const bothRequiredCheck = Object.values(required).filter(item => !item).length === 2;
  const [loaded, setLoaded] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userType = useSelector((state: RootState) => state.user.userType);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const checkEmailValidation = (currentEmail: string) => {
    const { emailRegex } = formRegex;
    if (!emailRegex.test(currentEmail)) {
      return setRequired({ ...required, email: true });
    }
    setRequired({ ...required, email: false });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation(currentEmail);
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      return setRequired({ ...required, email: true });
    }
  };

  const checkPassWordValidation = (currentPassWord: string) => {
    const { passWordRegex } = formRegex;
    if (!passWordRegex.test(currentPassWord)) {
      return setRequired({ ...required, passWord: true });
    }
    setLoaded(true);
    setRequired({ ...required, passWord: false });
  };

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassWord = e.target.value;
    setInputPassWord(currentPassWord);
    checkPassWordValidation(currentPassWord);
  };

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
    dispatch(changeMemberType(userType));
    dispatch(changeUser(userType));
    sw.toast.success('로그인 되었습니다.');
    navigate('/');
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
