import { useSearchPasswordSendEmailMutation } from '@/api/authApi';
import MILLI_SECONDS from '@/constants/milliSeconds';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { changeIndex, saveEmailTemporary } from '@/store/searchPassWordSlice';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Title from '../common/atoms/Title';
import Loading from '../common/Loading/Loading';
import Responsive from '../common/Responsive';
import RequiredMessage from '../SignUp/RequiredMessage';
import { checkEmailValidation } from './formValidation';

interface ValidateEmailProps {}

const ValidateEmail = (props: ValidateEmailProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const [registeredCheck, setRegisteredCheck] = useState<boolean>(false);

  const orderIndex = useSelector((state: RootState) => state.searchPassword.index);
  const dispatch = useAppDispatch();

  const [searchPasswordSendEmailAPI, { isLoading }] = useSearchPasswordSendEmailMutation();

  const handleInputEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation({ currentEmail, setRequired, setRegisteredCheck });
  };

  const handleValidationCodeButtonClick = async () => {
    if (!registeredCheck || required) {
      return sw.toast.warn('올바른 형식으로 이메일을 입력해주세요.');
    }
    try {
      const response = await searchPasswordSendEmailAPI({ email: inputEmail }).unwrap();
      if (response) {
        sw.toast.success('이메일로 인증 코드가 발송되었습니다.');
        dispatch(saveEmailTemporary(inputEmail));
        setTimeout(() => {
          dispatch(changeIndex(orderIndex + 1));
        }, MILLI_SECONDS.custom(1200));
      }
    } catch {
      console.error(`이메일이 잘못되었습니다.`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FindPasswordBlock>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>비밀번호 찾기</Title>
      </TitleWrapper>
      <InputWrapper>
        <Label>가입한 이메일 주소를 입력해 주세요.</Label>
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
    </FindPasswordBlock>
  );
};

export default ValidateEmail;

const FindPasswordBlock = styled.section`
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
