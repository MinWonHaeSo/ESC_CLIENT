import styled from '@emotion/styled';
import Input from '../common/atoms/Input';
import Button from '../common/atoms/WideButton';

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input type={'text'} placeholder={'아이디(이메일)'} />
      <Input type={'password'} placeholder={'비밀번호'} />
      <Button>로그인</Button>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
