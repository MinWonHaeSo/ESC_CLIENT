import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from '@/store/store';
import { setPassword } from '@/store/userSlice';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import RequiredMessage from '../RequiredMessage';
import { AllCheckedState } from '../SignUpForm';
import { checkPasswordConfirmValidation, checkPasswordValidation } from '../formValidation';

interface PasswordProps {
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

const Password = ({ allChecked, setAllChecked }: PasswordProps) => {
  const [formState, setFormState] = useState<InitialFormState>(initialFormState);
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allChecked.password && allChecked.passwordConfirm) {
      dispatch(setPassword(formState.password));
    }
  }, [allChecked]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormState({ ...formState, [id]: value });
    if (id === 'password') {
      checkPasswordValidation({ currentPassWord: value, setRequired, required, setAllChecked, allChecked });
    } else if (id === 'passwordConfirm') {
      checkPasswordConfirmValidation({
        formState,
        currentPassWordConfirm: value,
        setRequired,
        required,
        setAllChecked,
        allChecked,
      });
    }
  };

  return (
    <>
      <PasswordFormBlock>
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
          autoComplete="off"
        />
        <RequiredMessage required={required.password} />
      </PasswordFormBlock>
      <PasswordConfirmBlock>
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
          autoComplete="off"
        />
        <RequiredMessage required={required.passwordConfirm} />
      </PasswordConfirmBlock>
    </>
  );
};

export default Password;

const PasswordFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const PasswordConfirmBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const Desc = styled.p`
  letter-spacing: -0.01rem;
  font-size: ${typo.micro};
  color: ${palette.black[200]};
`;
