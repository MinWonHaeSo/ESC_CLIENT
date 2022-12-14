import { useSignOutMutation } from '@/api/userApi';
import formRegex from '@/constants/formRegex';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import { loggedOut } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';

const SignOut = () => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [required, setRequired] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleSignOutClick = async () => {
    try {
      const response = await signOutAPI('').unwrap();
      if (response) {
        sw.confirm(() => {
          sw.toast.success('성공적으로 탈퇴 되었습니다.');
          dispatch(
            loggedOut({
              type: 'USER',
              email: '',
              name: '',
              nickname: '',
              image: '',
              accessToken: '',
              refreshToken: '',
              loggedIn: false,
            }),
          );
          setTimeout(() => {
            navigate('/');
          }, 1000);
        });
      }
    } catch {
      console.error('탈퇴하는데 문제가 발생하였습니다.');
    }
  };

  return (
    <SignOutBlock>
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
    </SignOutBlock>
  );
};

export default SignOut;

const SignOutBlock = styled.section`
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
