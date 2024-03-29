import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSignUpMutation } from '@/api/userApi';
import { userFileUpload } from '@/api/fileUpload';
import { RootState, useAppDispatch } from '@/store/store';
import { uploadImage } from '@/store/authSlice';
import { useGoBack } from '@/hooks/useGoBack';
import formStateCheck from '@/lib/utils/formStateCheck';
import sw from '@/lib/utils/customSweetAlert';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import MILLI_SECONDS from '@/constants/milliSeconds';
import PATH from '@/constants/path';
import InsertImage from '../common/InsertImage';
import Loading from '../common/Loading/Loading';
import Button from '../common/atoms/Button';
import UserName from './Form/UserName';
import Password from './Form/PassWord';
import NickName from './Form/NickName';
import Email from './Form/Email';

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

const SignUpForm = React.memo(function SignupForm(props: SignUpFormProps) {
  const [allChecked, setAllChecked] = useState<AllCheckedState>(initialState);
  const [cloudImage, setCloudImage] = useState<File>();
  const goBack = useGoBack();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;
  const dispatch = useAppDispatch();

  const registerUser = useSelector((state: RootState) => state.user);
  const authUserImage = useSelector((state: RootState) => state.auth.image);

  const [signUpAPI, { isLoading }] = useSignUpMutation();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formStateCheck(allChecked)) return;
      const cloudinaryResponse = await userFileUpload(cloudImage);
      const userForm = { ...registerUser, image: cloudinaryResponse?.data.url };
      const response = await signUpAPI(userForm);
      if (response) {
        dispatch(uploadImage(cloudinaryResponse?.data.url));
        sw.toast.success('성공적으로 가입되었습니다.');
        setTimeout(() => {
          navigate(PATH.LOGIN);
        }, MILLI_SECONDS.one);
      }
    } catch {
      throw new Error('회원가입에 문제가 발생하였습니다.');
    }
  };

  const handleFormButtonClick = () => {
    if (!formStateCheck(allChecked)) {
      return sw.toast.warn('회원가입 폼을 모두 채워주세요.');
    }
  };

  const handleChangeUserImage = (file: File) => {
    setCloudImage(file);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SignUpFormBlock onSubmit={handleFormSubmit}>
      <InsertImage
        editDisabled={false}
        currentImage={authUserImage}
        currentLocation={currentLocation}
        onChangeImage={handleChangeUserImage}
      />
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
    </SignUpFormBlock>
  );
});

export default SignUpForm;

const SignUpFormBlock = styled.form`
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
