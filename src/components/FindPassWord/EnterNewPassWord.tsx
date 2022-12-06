import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { changeIndex } from '@/store/findPassWordSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import RequiredMessage from '../SignUp/RequiredMessage';

interface EnterNewPassWordProps {}

interface InitialRequiredState {
  passWord: boolean;
  passWordConfirm: boolean;
}

const initialRequiredState: InitialRequiredState = {
  passWord: false,
  passWordConfirm: false,
};

const EnterNewPassWord = (props: EnterNewPassWordProps) => {
  const [passWord, setPassWord] = useState<string>('');
  const [passWordConfirm, setPassWordConfirm] = useState<string>('');
  const [required, setRequired] = useState<InitialRequiredState>(initialRequiredState);
  const navigate = useNavigate();
  const orderIndex = useSelector((state: RootState) => state.findPassWord.index);
  const dispatch = useAppDispatch();

  // [] 서버에 저장된 비밀번호와 같은 지 비교하는 조건 확인 (이전단계에서 입력한 이메일로 비교)
  const checkPassWordValidation = (currentPassWord: string) => {
    const { passWordRegex } = formRegex;
    if (!passWordRegex.test(currentPassWord)) {
      return setRequired({ ...required, passWord: true });
    }
    setRequired({ ...required, passWord: false });
  };

  console.log(1);

  const handleNewPassWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassWord = e.target.value;
    setPassWord(currentPassWord);
    checkPassWordValidation(currentPassWord);
  };

  const checkPassWordConfirmValidation = (currentPassWordConfirm: string) => {
    if (passWord !== currentPassWordConfirm) {
      return setRequired({ ...required, passWordConfirm: true });
    }
    setRequired({ ...required, passWordConfirm: false });
  };

  const handleNewPassWordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassWordConfirm = e.target.value;
    setPassWordConfirm(currentPassWordConfirm);
    checkPassWordConfirmValidation(currentPassWordConfirm);
  };

  // [] 서버에 저장된 이전 사용자 비밀번호와 비교하여 같으면, 같다고 경고 알림 메세지 띄우지
  const handleChangePassWordClick = () => {
    if (passWord === 'zero@1234') {
      return sw.toast.error('이전에 사용하던 비밀번호와 같습니다.');
    }
    sw.toast.success('성공적으로 변경되었습니다.');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    setTimeout(() => {
      dispatch(changeIndex(orderIndex - 2));
    }, 1500);
  };

  return (
    <EnterNewPassWordBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>비밀번호 변경</Title>
      </TitleWrapper>
      <InputWrapper>
        <Label>새로운 비밀번호</Label>
        <Input
          type={'password'}
          value={passWord}
          placeholder={'새로운 비밀번호를 입력하세요'}
          minLength={8}
          onChange={handleNewPassWordChange}
          required={required.passWord}
        />
        <RequiredMessage required={required.passWord} />
      </InputWrapper>
      <InputWrapper>
        <Label>새로운 비밀번호 확인</Label>
        <Input
          type={'password'}
          value={passWordConfirm}
          placeholder={'새로운 비밀번호 확인'}
          minLength={8}
          onChange={handleNewPassWordConfirmChange}
          required={required.passWordConfirm}
        />
        <RequiredMessage required={required.passWordConfirm} />
      </InputWrapper>
      <SWrapper>
        <Button
          type={'button'}
          size={'large'}
          backgroundColor={!passWordConfirm.length ? `${palette.grey[200]}` : `${palette.black[100]}`}
          onClick={handleChangePassWordClick}
        >
          변 경
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
