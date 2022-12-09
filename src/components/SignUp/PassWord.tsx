import React, { useState } from 'react';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Input from '../common/atoms/Input';
import Label from '../common/atoms/Label';
import RequiredMessage from './RequiredMessage';
import { AllCheckedState } from './SignUpForm';
import { useAppDispatch } from '@/store/store';
import { setPassword } from '@/store/userSlice';
import { useEffect } from 'react';

interface PassWordProps {
  allChecked: AllCheckedState;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
}

interface InitialFormState {
  password: string;
  passwordConfirm: string;
}

interface InitialRequiredState {
  password: boolean;
  passwordConfirm: boolean;
}

const initialFormState: InitialFormState = {
  password: '',
  passwordConfirm: '',
};

const initialRequiredState: InitialRequiredState = {
  password: false,
  passwordConfirm: false,
};

const PassWord = ({ allChecked, setAllChecked }: PassWordProps) => {
  const [formState, setFormState] = useState<InitialFormState>(initialFormState);
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allChecked.password && allChecked.passwordConfirm) {
      dispatch(setPassword(formState.password));
    }
  }, [allChecked.password, allChecked.passwordConfirm]);

  const checkPassWordValidation = (currentPassWord: string) => {
    const { passwordRegex } = formRegex;
    if (!passwordRegex.test(currentPassWord)) {
      return setRequired({ ...required, password: true });
    }
    setRequired({ ...required, password: false });
    setAllChecked({ ...allChecked, password: true });
  };

  const checkPassWordConfirmValidation = (currentPassWordConfirm: string) => {
    const { password } = formState;
    if (password !== currentPassWordConfirm) {
      return setRequired({ ...required, passwordConfirm: true });
    }
    setRequired({ ...required, passwordConfirm: false });
    setAllChecked({ ...allChecked, passwordConfirm: true });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormState({ ...formState, [id]: value });
    if (id === 'password') {
      checkPassWordValidation(value);
    } else if (id === 'passwordConfirm') {
      checkPassWordConfirmValidation(value);
    }
  };

  return (
    <>
      <PassWordFormBlock>
        <Label htmlFor={'password'} required={required.password}>
          비밀번호
        </Label>
        <Desc>영문, 숫자, 특수기호를 포함한 8자 이상을 입력해주세요.</Desc>
        <Input
          type="password"
          value={formState.password}
          id="password"
          placeholder="비밀번호"
          onChange={handleFormChange}
          required={required.password}
        />
        <RequiredMessage required={required.password} />
      </PassWordFormBlock>
      <PassWordConfirmBlock>
        <Label htmlFor={'passwordConfirm'} required={required.passwordConfirm}>
          비밀번호 확인
        </Label>
        <Input
          type="password"
          value={formState.passwordConfirm}
          id="passwordConfirm"
          placeholder="비밀번호 확인"
          onChange={handleFormChange}
          required={required.passwordConfirm}
        />
        <RequiredMessage required={required.passwordConfirm} />
      </PassWordConfirmBlock>
    </>
  );
};

export default PassWord;

const PassWordFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const PassWordConfirmBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const Desc = styled.p`
  font-size: ${typo.micro};
  color: ${palette.black[200]};
`;
