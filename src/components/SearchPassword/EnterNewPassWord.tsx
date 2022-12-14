import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useChangePasswordRequestMutation } from '@/api/authApi';
import MILLI_SECONDS from '@/constants/milliSeconds';
import PATH from '@/constants/path';
import sw from '@/lib/utils/customSweetAlert';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { changeNewPassword } from '@/store/searchPassWordSlice';
import { RootState, useAppDispatch } from '@/store/store';
import Responsive from '../common/Responsive';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Title from '../common/atoms/Title';
import RequiredMessage from '../SignUp/RequiredMessage';
import { checkPasswordConfirmValidation, checkPasswordValidation } from './formValidation';

interface EnterNewPasswordProps {}

interface InitialRequiredState {
  password: boolean;
  passwordConfirm: boolean;
}

interface InitialFormState {
  password: string;
  passwordConfirm: string;
}

const initialFormState: InitialFormState = {
  password: '',
  passwordConfirm: '',
};

const initialRequiredState: InitialRequiredState = {
  password: false,
  passwordConfirm: false,
};

const EnterNewPassWord = (props: EnterNewPasswordProps) => {
  const [formState, setFormState] = useState<InitialFormState>(initialFormState);
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);
  const { password, passwordConfirm } = formState;
  const navigate = useNavigate();

  const orderIndex = useSelector((state: RootState) => state.searchPassword.index);
  const savedInfo = useSelector((state: RootState) => state.searchPassword);

  const dispatch = useAppDispatch();

  const [changePasswordRequestAPI] = useChangePasswordRequestMutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormState({ ...formState, [id]: value });
    if (id === 'password') {
      checkPasswordValidation({ currentPassword: value, setRequired, required });
    } else if (id === 'passwordConfirm') {
      checkPasswordConfirmValidation({ password, currentPasswordConfirm: value, setRequired, required });
    }
  };

  console.log(password, passwordConfirm);

  // [] ????????? ????????? ??????????????? ?????? ??? ???????????? ?????? ?????? (?????????????????? ????????? ???????????? ??????)
  // [] ????????? ????????? ?????? ????????? ??????????????? ???????????? ?????????, ????????? ?????? ?????? ????????? ?????????
  const handleChangePasswordClick = async () => {
    const requestInfo = {
      email: savedInfo.email,
      prePassword: null,
      newPassword: password,
      confirmPassword: passwordConfirm,
      hasToken: false,
    };

    try {
      const response = await changePasswordRequestAPI(requestInfo);
      if (response) {
        sw.toast.success(`??????????????? ?????????????????????.`);
        dispatch(
          changeNewPassword({
            index: orderIndex - 2,
            prePassword: null,
            newPassword: password,
            confirmPassword: passwordConfirm,
            hasToken: false,
          }),
        );
        setTimeout(() => {
          navigate(`${PATH.LOGIN}`);
        }, MILLI_SECONDS.one);
      }
    } catch {
      console.error('?????? ??????????????? ?????? ??? ????????????.');
    }
  };

  return (
    <EnterNewPassWordBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>???????????? ??????</Title>
      </TitleWrapper>
      <InputWrapper>
        <Label>????????? ????????????</Label>
        <Input
          type={'password'}
          value={password}
          id={'password'}
          placeholder={'????????? ??????????????? ???????????????'}
          minLength={8}
          onChange={handleFormChange}
          required={required.password}
        />
        <RequiredMessage required={required.password} />
      </InputWrapper>
      <InputWrapper>
        <Label>????????? ???????????? ??????</Label>
        <Input
          type={'password'}
          value={passwordConfirm}
          id={'passwordConfirm'}
          placeholder={'????????? ???????????? ??????'}
          minLength={8}
          onChange={handleFormChange}
          required={required.passwordConfirm}
        />
        <RequiredMessage required={required.passwordConfirm} />
      </InputWrapper>
      <SWrapper>
        <Button
          type={'button'}
          size={'large'}
          backgroundColor={!passwordConfirm.length ? `${palette.grey[200]}` : `${palette.black[100]}`}
          onClick={handleChangePasswordClick}
        >
          ??? ???
        </Button>
      </SWrapper>
    </EnterNewPassWordBlock>
  );
};

export default EnterNewPassWord;

const EnterNewPassWordBlock = styled.div`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 31.5px;
  margin-bottom: 20px;
  gap: 8px;
  width: 280px;
`;

const Label = styled.span`
  font-size: ${typo.small};
  font-weight: 400;
  line-height: ${typo.medium};
  color: ${palette.black[200]};
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
