import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { changeIndex } from '@/store/findPassWordSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import RequiredMessage from '../SignUp/RequiredMessage';

interface ValidateEmailProps {}

const ValidateEmail = (props: ValidateEmailProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const [registeredCheck, setRegisteredCheck] = useState<boolean>(false);
  const orderIndex = useSelector((state: RootState) => state.findPassWord.index);
  const dispatch = useAppDispatch();

  const checkEmailValidation = (currentEmail: string) => {
    const { emailRegex } = formRegex;
    if (!emailRegex.test(currentEmail) && !registeredCheck) {
      return setRequired(true);
    }
    setRequired(false);
  };

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation(currentEmail);
  };

  const handleEmailCheckButtonClick = () => {
    if (!inputEmail.length) {
      return setRequired(true);
    }
    setRegisteredCheck(true);
    sw.toast.success('가입된 이메일 입니다.');
  };

  const handleValidationCodeButtonClick = () => {
    if (!registeredCheck || required) {
      return sw.toast.warn('가입된 이메일인지 확인해 주세요.');
    }
    sw.toast.success('인증코드가 발송되었습니다.');
    dispatch(changeIndex(orderIndex + 1));
  };

  return (
    <FindPassWordBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>비밀번호 찾기</Title>
      </TitleWrapper>
      <InputWrapper>
        <LabelWrapper>
          <Label>가입한 이메일 주소를 입력해 주세요.</Label>
          <Button
            type={'button'}
            size={'small'}
            backgroundColor={`${palette.primary['point']}`}
            onClick={handleEmailCheckButtonClick}
          >
            확 인
          </Button>
        </LabelWrapper>
        <Input
          type={'email'}
          id={'email'}
          value={inputEmail}
          placeholder={'example@email.com'}
          onChange={handleInputEmailChange}
          required={required}
        />
        <RequiredMessage required={required} />
      </InputWrapper>
      <SWrapper>
        <Button
          type={'button'}
          size={'large'}
          backgroundColor={registeredCheck ? `${palette.black[100]}` : `${palette.grey[200]}`}
          onClick={handleValidationCodeButtonClick}
        >
          인증 코드 보내기
        </Button>
      </SWrapper>
    </FindPassWordBlock>
  );
};

export default ValidateEmail;

const FindPassWordBlock = styled.section`
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
  gap: 8px;
  width: 280px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
