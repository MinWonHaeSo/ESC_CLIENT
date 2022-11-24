import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <InputId type="text" placeholder="아이디(이메일)" autoCapitalize="none" />
      <InputPassword type="password" placeholder="비밀번호" autoCapitalize="none" />
      <FormButton type="submit">로그인</FormButton>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
`;

const InputId = styled.input`
  width: 240px;
  padding: 0.75rem 1rem;
  border: 1px solid ${palette.grey[300]};
  border-radius: 1.2rem;
  font-size: 15px;

  &::placehorder {
    color: ${palette.black[200]};
  }

  &:focus {
    border: 1px solid ${palette.pointColor.point};
  }
`;

const InputPassword = styled.input`
  width: 240px;
  padding: 0.75rem 1rem;
  border: 1px solid ${palette.grey[300]};
  border-radius: 1.2rem;
  font-size: 15px;

  &::placehorder {
    color: ${palette.black[200]};
  }

  &:focus {
    border: 1px solid ${palette.pointColor.point};
  }
`;

const FormButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  width: 240px;
  border-radius: 1.2rem;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background-color: ${palette.black[200]};

  &:active {
    color: #fff;
    background-color: ${palette.pointColor.point};
  }
`;
