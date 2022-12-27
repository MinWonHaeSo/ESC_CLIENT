import { useEffect, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCredentials, sustainLogin } from '@/store/authSlice';
import { RootState, useAppDispatch } from '@/store/store';
import { useRefetchUserInfoMutation } from '@/api/authApi';
import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import Responsive from '@/components/common/Responsive';
import usePathHeaderOnlyLogo from '@/hooks/usePathHeaderOnlyLogo';
import { getAuthToken } from '@/lib/utils/token';
import { getCookie } from '@/lib/utils/cookies';
import palette from '@/lib/styles/palette';
import PATH from '@/constants/path';
import { useGoBack } from '@/hooks/useGoBack';
import Loading from '../common/Loading/Loading';
import Navbar from './Navbar';

interface HomeProps {}

const Header = (props: HomeProps) => {
  const [isActive, setIsActive] = useState(false);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [refetchUserInfoAPI, { isLoading }] = useRefetchUserInfoMutation();
  const checkHeader = usePathHeaderOnlyLogo();
  const dispatch = useAppDispatch();
  const goBack = useGoBack();
  const navigate = useNavigate();

  const handleChangeIsActive = () => {
    setIsActive(!isActive);
  };

  const checkLogin = useCallback(async () => {
    if (loggedIn) {
      return;
    }
    const accessToken = getAuthToken();
    const userType = localStorage.getItem('userType');
    const refreshToken = getCookie('refreshToken');
    dispatch(setCredentials({ accessToken, refreshToken }));

    try {
      const response = await refetchUserInfoAPI('').unwrap();
      const { id, nickname, name, email, imgUrl } = response;
      const accessToken = getAuthToken();
      if (response) {
        dispatch(
          sustainLogin({
            id: id,
            type: userType,
            email: email,
            nickname: nickname,
            name: name,
            imgUrl: imgUrl,
            accessToken: accessToken,
            loggedIn: true,
          }),
        );
      }
    } catch {
      navigate(PATH.LOGIN);
      console.error('회원 정보를 다시 받아오는데 문제가 발생했습니다.');
    }
  }, []);

  useEffect(() => {
    if (getAuthToken() && !loggedIn) {
      checkLogin();
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HeaderContainer>
      {checkHeader ? (
        <GoBackIconBlock onClick={goBack}>
          <i className="fa-solid fa-arrow-left" />
        </GoBackIconBlock>
      ) : (
        <ToggleMenuBar onClick={handleChangeIsActive}>
          <i className="fa-solid fa-bars" />
        </ToggleMenuBar>
      )}
      <LogoBlock>
        <Link to={PATH.ROOT} aria-label="Easy Sports Club 로고">
          <NavbarLogo width="80px" height="80px" />
        </Link>
      </LogoBlock>
      <Navbar isActive={isActive} onChangeIsActive={handleChangeIsActive} />
      {loggedIn || checkHeader ? null : <UserMenu>{isLoading ? null : <Link to={PATH.LOGIN}>로그인</Link>}</UserMenu>}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.nav`
  position: relative;
  display: flex;
  height: 80px;
  background-color: #fff;
  justify-content: space-between;
  font-weight: 600;
  & > a {
    width: 50px;
    height: 50px;
  }
  ${Responsive.ResponsiveWrapper}
`;

const GoBackIconBlock = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  i {
    font-size: 20px;
  }
`;

const ToggleMenuBar = styled.div`
  padding: 0.25rem;
  i {
    font-size: 24px;
  }
`;

const LogoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const UserMenu = styled.div`
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px;
  &:hover {
    background-color: ${palette.grey[100]};
  }
  a {
    display: inline-block;
    padding: 0.25rem 0.2rem;
  }
`;
