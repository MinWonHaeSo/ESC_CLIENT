import { RootState } from '@/store/store';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import TabMenu from '../common/TabMenu';
import Responsive from '../common/Responsive';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const userId = useSelector((state: RootState) => state.userslice.userId);

  return (
    <LoginBlock>
      <TabMenu />
      <LoginForm />
      {userId === 0 && <SocialLogin />}
      <RegisterBlock>
        <Li>
          <Link to="/signup">회원가입</Link>
        </Li>
        <Li>
          <Link to="/">비밀번호 찾기</Link>
        </Li>
      </RegisterBlock>
    </LoginBlock>
  );
};

export default Login;

const LoginBlock = styled.section`
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
