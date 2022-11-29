import React, { useState } from 'react';
import { useGoBack } from '@/hooks/useGoBack';
import { useNavigate } from 'react-router';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';
import Label from '../common/atoms/Label';

interface SignUpFormProps {}

const SignUpForm = (props: SignUpFormProps) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [overlapEmail, setOverlapEmail] = useState(true);
  const handleEmailDoubleCheck = () => {
    setTimeout(() => {
      setOverlapEmail(false);
    }, 1000);
  };

  const goBack = useGoBack();
  const navigate = useNavigate();

  return (
    <FormBlock onSubmit={handleFormSubmit}>
      <SWrapper>
        <EmailBlock>
          <Label htmlFor={'email'}>이메일</Label>
          <DoubleCheckButton
            type="button"
            size={'small'}
            color={`${palette.grey[500]}`}
            backgroundColor={`${palette.grey[200]}`}
            onClick={handleEmailDoubleCheck}
          >
            중복검사
          </DoubleCheckButton>
        </EmailBlock>
        <Input type="email" id="email" placeholder="example.email.com" />
      </SWrapper>
      <Button
        type="button"
        size={'large'}
        backgroundColor={overlapEmail ? `${palette.grey[200]}` : `${palette.black[100]}`}
        onClick={() => {}}
      >
        인증하기
      </Button>
      <SWrapper>
        <Label htmlFor={'password'}>비밀번호</Label>
        <Desc>영문, 숫자를 포함한 8자 이상을 입력해주세요.</Desc>
        <Input type="password" id="password" placeholder="비밀번호" />
      </SWrapper>
      <SWrapper>
        <Label htmlFor={'passwordConfirm'}>비밀번호 확인</Label>
        <Input type="password" id="passwordConfirm" placeholder="비밀번호 확인" />
      </SWrapper>
      <SWrapper>
        <Label htmlFor={'nickname'}>이메일</Label>
        <Desc>다른 유저와 겹치지 않도록 입력해주세요 (2 ~ 15자)</Desc>
        <Input type="text" id="nickname" placeholder="닉네임 입력" />
      </SWrapper>
      <StyleWrapper>
        <Button type="submit" size={'large'} backgroundColor={`${palette.black[100]}`} onClick={() => navigate('/')}>
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

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 8px;
  gap: 8px;
`;

const EmailBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DoubleCheckButton = styled(Button)`
  border: 1px solid black;
`;

const Desc = styled.p`
  font-size: ${typo.micro};
  color: ${palette.black[200]};
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
