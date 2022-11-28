import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import Input from '../common/atoms/Input';

interface LoginFormProps {}

const LoginForm = (props: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {};
  return (
    <FormBlock onSubmit={handleSubmit}>
      <Input type={'text'} placeholder={'아이디(이메일)'} />
      <Input type={'password'} placeholder={'비밀번호'} />
      <Button type={'submit'} size={'large'} backgroundColor={`${palette.black[100]}`} onClick={handleButtonClick}>
        로그인
      </Button>
    </FormBlock>
  );
};

export default LoginForm;

const FormBlock = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
`;
