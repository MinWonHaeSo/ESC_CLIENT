import { useGoBack } from '@/hooks/useGoBack';
import { useNavigate } from 'react-router';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import Email from './Email';
import PassWord from './PassWord';
import NickName from './NickName';
import { useState } from 'react';
import sw from '@/lib/utils/customSweetAlert';

interface SignUpFormProps {}

export interface AllCheckedState {
  email: boolean;
  passWord: boolean;
  passWordConfirm?: boolean;
  nickName?: boolean;
}

const initialState: AllCheckedState = {
  email: false,
  passWord: false,
  passWordConfirm: false,
  nickName: false,
};

const SignUpForm = (props: SignUpFormProps) => {
  const [allChecked, setAllChecked] = useState<AllCheckedState>(initialState);
  const goBack = useGoBack();
  const navigate = useNavigate();
  const totalAllChecked = Object.values(allChecked).filter(item => item === true).length;
  console.log(totalAllChecked);
  console.log(allChecked);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleFormButtonClick = () => {
    if (totalAllChecked !== 4) {
      return;
    }
    sw.toast.success('성공적으로 가입되었습니다.');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <FormBlock onSubmit={handleFormSubmit}>
      <Email allChecked={allChecked} setAllChecked={setAllChecked} />
      <PassWord allChecked={allChecked} setAllChecked={setAllChecked} />
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
  }
`;
