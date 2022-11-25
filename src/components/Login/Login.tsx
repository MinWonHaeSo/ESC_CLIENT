import styled from '@emotion/styled';
import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import { Link } from 'react-router-dom';
import palette from '@/lib/styles/palette';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import { typo } from '@/lib/styles/typo';

interface LoginProps {}

const Login = (props: LoginProps) => {
  console.log('');
  return (
    <LoginBlock>
      <LoginHeader>
        <Link to="/">
          <NavbarLogo width="80px" height="80px" />
        </Link>
      </LoginHeader>
      <LoginSection>
        <Title>Login</Title>
        <LoginForm />
        <SocialLogin />
        <RegisterWrapper>
          <Li>
            <Link to="/">회원가입</Link>
          </Li>
          <Li>
            <span></span>
          </Li>
          <Li>
            <Link to="/">비밀번호 찾기</Link>
          </Li>
        </RegisterWrapper>
      </LoginSection>
    </LoginBlock>
  );
};

export default Login;

const LoginBlock = styled.div`
  width: 100%;
  height: 100vh;
`;

const LoginHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 3rem;
  border-bottom: 1px solid ${palette.grey[100]};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.125);
  background-color: #fff;

  a {
    display: flex;
    align-items: center;
  }
`;

const LoginSection = styled.section`
  padding: 0.5rem 3rem;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.75rem;
  font-size: ${typo.xLarge};
  font-weight: 600;
`;

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  height: 1rem;
  font-size: 15px;
  font-weight: 500;
  color: ${palette.black[100]};

  a {
    padding: 0.75rem 1rem;
  }

  a:hover {
    color: ${palette.primary.point};
  }

  a:active {
    color: ${palette.primary.point};
  }

  span {
    width: 1px;
    height: 100%;
    background-color: ${palette.black[100]};
  }
`;
