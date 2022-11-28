import styled from '@emotion/styled';
import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import { Link } from 'react-router-dom';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import TabMenu from '../common/TabMenu';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';

interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <LoginBlock>
      <LoginHeader>
        <Link to="/">
          <NavbarLogo width="80px" height="80px" />
        </Link>
      </LoginHeader>
      <LoginSection>
        <TabMenu />
        <LoginForm />
        <SocialLogin />
        <RegisterBlock>
          <Li>
            <Link to="/signup">회원가입</Link>
          </Li>
          <Li>
            <Link to="/">비밀번호 찾기</Link>
          </Li>
        </RegisterBlock>
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
  ${Responsive.ResponsiveWrapper}
`;

const RegisterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  height: 1rem;
  font-size: ${typo.small};
  font-weight: 500;
  color: ${palette.black[100]};

  a {
    position: relative;
    padding: 12px 16px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    a::before {
      position: absolute;
      content: '';
      top: 50%;
      left: 0;
      width: 1px;
      height: 14px;
      transform: translateY(-45%);
      background-color: ${palette.black[200]};
    }
  }
`;
