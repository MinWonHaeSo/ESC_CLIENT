import React, { useState } from 'react';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Label from '../common/atoms/Label';
import RequiredMessage from './RequiredMessage';
import { AllCheckedState } from './SignUpForm';
import RequiredInput from '../common/atoms/RequiredInput';

interface PassWordProps {
  allChecked: AllCheckedState;
  setAllChecked: React.Dispatch<React.SetStateAction<AllCheckedState>>;
}

interface InitialRequiredState {
  passWord: boolean;
  passWordConfirm: boolean;
}

const initialRequiredState: InitialRequiredState = {
  passWord: false,
  passWordConfirm: false,
};

const PassWord = ({ allChecked, setAllChecked }: PassWordProps) => {
  const [passWord, setPassWord] = useState<string>('');
  const [passWordConfirm, setPassWordConfirm] = useState<string>('');
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);

  const checkPassWordValidation = (currentPassWord: string) => {
    const { passWordRegex } = formRegex;
    if (!passWordRegex.test(currentPassWord)) {
      return setRequired({ ...required, passWord: true });
    }
    setRequired({ ...required, passWord: false });
    setAllChecked({ ...allChecked, passWord: true });
  };

  const handlePassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassWord = e.target.value;
    setPassWord(currentPassWord);
    checkPassWordValidation(currentPassWord);
  };

  const checkPassWordConfirmValidation = (currentPassWordConfirm: string) => {
    if (passWord !== currentPassWordConfirm) {
      return setRequired({ ...required, passWordConfirm: true });
    }
    setRequired({ ...required, passWordConfirm: false });
    setAllChecked({ ...allChecked, passWordConfirm: true });
  };

  const handlePassWordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassWordConfirm = e.target.value;
    setPassWordConfirm(currentPassWordConfirm);
    checkPassWordConfirmValidation(currentPassWordConfirm);
  };

  return (
    <>
      <PassWordFormBlock>
        <Label htmlFor={'password'} required={required.passWord}>
          비밀번호
        </Label>
        <Desc>영문, 숫자, 특수기호를 포함한 8자 이상을 입력해주세요.</Desc>
        <RequiredInput
          type="password"
          value={passWord}
          id="password"
          placeholder="비밀번호"
          onChange={handlePassWordChange}
          required={required.passWord}
        />
        <RequiredMessage required={required.passWord} />
      </PassWordFormBlock>
      <PassWordConfirmBlock>
        <Label htmlFor={'passwordConfirm'} required={required.passWordConfirm}>
          비밀번호 확인
        </Label>
        <RequiredInput
          type="password"
          value={passWordConfirm}
          id="passwordConfirm"
          placeholder="비밀번호 확인"
          onChange={handlePassWordConfirmChange}
          required={required.passWordConfirm}
        />
        <RequiredMessage required={required.passWordConfirm} />
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
