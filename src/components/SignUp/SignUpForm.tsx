import { useGoBack } from '@/hooks/useGoBack';
import { useLocation, useNavigate } from 'react-router';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import UserName from './UserName';
import Email from './Email';
import Password from './PassWord';
import NickName from './NickName';
import { useState } from 'react';
import sw from '@/lib/utils/customSweetAlert';
import { useSignUpMutation } from '@/api/userApi';
import formStateCheck from '@/lib/utils/formStateCheck';
import InsertImage from '../common/InsertImage';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import PATH from '@/constants/path';

interface SignUpFormProps {}

export interface AllCheckedState {
  userName: boolean;
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
  nickName: boolean;
}

const initialState: AllCheckedState = {
  userName: false,
  email: false,
  password: false,
  passwordConfirm: false,
  nickName: false,
};

const SignUpForm = (props: SignUpFormProps) => {
  const [allChecked, setAllChecked] = useState<AllCheckedState>(initialState);
  const goBack = useGoBack();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

  const registerUser = useSelector((state: RootState) => state.user);
  const authUserImage = useSelector((state: RootState) => state.auth.image);
  console.log(registerUser);
  console.log(authUserImage);
  const [signUpAPI] = useSignUpMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formStateCheck(allChecked)) {
        const response = await signUpAPI(registerUser);
        console.log(response);
        sw.toast.success('성공적으로 가입되었습니다. 로그인 해주세요.');
        setTimeout(() => {
          navigate(PATH.LOGIN);
        }, 1500);
      }
    } catch {
      throw new Error('error');
    }
  };

  const handleFormButtonClick = () => {
    if (!formStateCheck(allChecked)) {
      return sw.toast.warn('회원가입 폼을 모두 채워주세요.');
    }
  };

  return (
    <FormBlock onSubmit={handleFormSubmit}>
      <InsertImage editDisabled={false} currentImage={authUserImage} currentLocation={currentLocation} />
      <UserName allChecked={allChecked} setAllChecked={setAllChecked} />
      <Email allChecked={allChecked} setAllChecked={setAllChecked} />
      <Password allChecked={allChecked} setAllChecked={setAllChecked} />
      <NickName allChecked={allChecked} setAllChecked={setAllChecked} />
      <StyleWrapper>
        <Button type="submit" size={'large'} backgroundColor={`${palette.black[100]}`} onClick={handleFormButtonClick}>
          회원가입하기
        </Button>
      </StyleWrapper>
      <QuestionDesc>
        이미 아이디가 있으신가요? <span onClick={goBack}>로그인</span>
      </QuestionDesc>
    </FormBlock>
  );
};

export default SignUpForm;

const FormBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const StyleWrapper = styled.div`
  margin-top: 2rem;
`;

const QuestionDesc = styled.p`
  margin-bottom: 3rem;
  font-size: ${typo.small};
  color: ${palette.grey[500]};
  span {
    font-weight: 600;
    text-decoration: underline;
    color: ${palette.black[200]};
    cursor: pointer;
  }
`;
