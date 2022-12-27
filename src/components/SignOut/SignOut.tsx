import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSignOutMutation } from '@/api/userApi';
import { RootState, useAppDispatch } from '@/store/store';
import { loggedOut } from '@/store/authSlice';
import MILLI_SECONDS from '@/constants/milliSeconds';
import { deleteCookie } from '@/lib/utils/cookies';
import { removeAuthToken } from '@/lib/utils/token';
import sw from '@/lib/utils/customSweetAlert';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import formRegex from '@/constants/formRegex';
import PATH from '@/constants/path';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';

const SignOut = () => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const navigate = useNavigate();
  const authUserType = useSelector((state: RootState) => state.auth.type);
  const [signOutAPI] = useSignOutMutation();
  const dispatch = useAppDispatch();

  const checkEmailValidation = (currentEmail: string) => {
    const { emailRegex } = formRegex;
    if (!emailRegex.test(currentEmail)) {
      return setRequired(true);
    }
    setRequired(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    checkEmailValidation(currentEmail);
  };

  const handleSignOutClick = () => {
    try {
      sw.confirm(async () => {
        const response = await signOutAPI('').unwrap();
        if (response) {
          sw.toast.success('성공적으로 탈퇴 되었습니다.');
          dispatch(loggedOut());
          removeAuthToken();
          localStorage.removeItem('userType');
          deleteCookie('refreshToken');
          setTimeout(() => {
            navigate(`${PATH.ROOT}`);
          }, MILLI_SECONDS.one);
        }
      });
    } catch {
      if (authUserType === 'MANAGER') {
        sw.toast.error('등록한 체육관을 삭제하고 탈퇴해 주세요!');
      }
      if (authUserType === 'USER') {
        sw.toast.error('얘약을 취소하고 탈퇴해 주세요!');
      }
      console.error('탈퇴하는데 문제가 발생하였습니다.');
    }
  };

  return (
    <SignOutContainer>
      <TitleWrapper>
        <Title fontSize={`${typo.xxLarge}`}>회원 탈퇴</Title>
      </TitleWrapper>
      <InputWrapper>
        <RequestMessage>현재 사용하는 이메일과 똑같이 입력해 주세요.</RequestMessage>
        <Input value={inputEmail} type={'email'} id={'email'} required={required} onChange={handleEmailChange} />
        <Button type={'button'} size={'large'} backgroundColor={`${palette.grey[200]}`} onClick={handleSignOutClick}>
          탈퇴신청
        </Button>
      </InputWrapper>
    </SignOutContainer>
  );
};

export default SignOut;

const SignOutContainer = styled.section`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  margin: 20px 0;
`;

const RequestMessage = styled.p`
  font-size: ${typo.small};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 31.5px;
  gap: 8px;
  width: 280px;
`;
