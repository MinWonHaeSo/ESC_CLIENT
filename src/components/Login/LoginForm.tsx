import React, { useState, useCallback } from 'react';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import sw from '@/lib/utils/customSweetAlert';
import { RootState, useAppDispatch } from '@/store/store';
import { changeUserType } from '@/store/userSlice';
import { checkLoggedIn } from '@/store/authSlice';
import { changeMemberType } from '@/store/memberCheckSlice';
import { useNavigate } from 'react-router';
import Input from '../common/atoms/Input';
import Button from '../common/atoms/Button';
import { useSelector } from 'react-redux';

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

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userType = useSelector((state: RootState) => state.user.userType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const checkEmailValidation = (currentEmail: string) => {
    const { emailRegex } = formRegex;
    if (!emailRegex.test(currentEmail)) {
      setLoaded(false);
      return setRequired({ ...required, email: true });
    }
    setRequired({ ...required, email: false });
  };

  const checkPassWordValidation = (currentPassWord: string) => {
    const { passwordRegex } = formRegex;
    if (!passwordRegex.test(currentPassWord)) {
      setLoaded(false);
      return setRequired({ ...required, password: true });
    }
    setLoaded(true);
    setRequired({ ...required, password: false });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
    if (id === 'email') {
      checkEmailValidation(value);
    } else if (id === 'password') {
      checkPassWordValidation(value);
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
    dispatch(checkLoggedIn(true));
    dispatch(changeMemberType(userType));
    dispatch(changeUserType(userType));
    sw.toast.success('로그인 되었습니다.');
    navigate('/');
  };

  return (
    <FormBlock onSubmit={handleSubmit}>
      <Input
        type={'text'}
        value={formState.email}
        id={'email'}
        placeholder={'아이디(이메일)'}
        onChange={handleFormChange}
        required={required.email}
      />
      <Input
        type={'password'}
        value={formState.password}
        id={'password'}
        placeholder={'비밀번호'}
        onChange={handleFormChange}
        required={required.password}
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
