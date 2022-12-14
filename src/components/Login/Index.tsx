import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store/store';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import PATH from '@/constants/path';
import Responsive from '../common/Responsive';
import TabMenu from '../common/TabMenu';
import SocialLogin from './SocialLogin';
import LoginForm from './LoginForm';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const userType = useSelector((state: RootState) => state.user.type);

  return (
    <LoginContainer>
      <TabMenu />
      <LoginForm />
      {userType === 'USER' && <SocialLogin />}
      <RegisterBlock>
        <Li>
          <Link to={PATH.SIGN_UP}>회원가입</Link>
        </Li>
        <Li>
          <Link to={PATH.SEARCH_PASSWORD}>비밀번호 찾기</Link>
        </Li>
      </RegisterBlock>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.section`
  position: relative;
  width: 100%;
  ${Responsive.ResponsiveWrapper}
`;

const RegisterBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
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
    padding: 8px 16px;
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
