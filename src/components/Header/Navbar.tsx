import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/api/authApi';
import { RootState, useAppDispatch } from '@/store/store';
import { loggedOut } from '@/store/authSlice';
import { DEFAULT_ICONURL } from '@/constants/defaultImage';
import HEADER_NAV from '@/constants/headerNav';
import PATH from '@/constants/path';
import { getAuthToken, removeAuthToken } from '@/lib/utils/token';
import { deleteCookie, getCookie } from '@/lib/utils/cookies';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import sw from '@/lib/utils/customSweetAlert';
import { UserType } from '@/types/userType';
import NotificationButton from './NotificationButton';

interface NavbarProps {
  isActive: boolean;
  onChangeIsActive: () => void;
}

const Navbar = ({ isActive, onChangeIsActive }: NavbarProps) => {
  const [loginType, setLoginType] = useState<UserType>('USER'); //user, manager
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
  const { nickname, loggedIn, type, image } = authUser;

  const [logoutAPI] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      // cookied에서 RefreshToken 꺼내기
      const refreshToken = getCookie('refreshToken');
      const response = await logoutAPI(refreshToken).unwrap();
      if (response) {
        dispatch(loggedOut());
        onChangeIsActive();

        deleteCookie('refreshToken', { path: `${PATH.ROOT}` });

        // accessToken localStorage에서 삭제
        removeAuthToken();
        localStorage.removeItem('userType');
        sw.toast.success('로그아웃 되었습니다.');
      }
    } catch {
      console.error('로그아웃 하는데 문제가 생겼습니다.');
    }
  };

  const handleListClick = () => {
    if (!loggedIn && !getAuthToken()) {
      navigate(`${PATH.LOGIN}`);
      console.error('로그인 해주세요');
    }
    onChangeIsActive();
  };

  useEffect(() => {
    setLoginType(type);
  }, [type]);

  return (
    <NavBarContainer>
      <NavbarMenu isActive={isActive}>
        <UserProfile>
          <div>
            <img src={image ? image : DEFAULT_ICONURL} alt="프로필" width="70px" height="70px" />
          </div>
          <span>{nickname ? nickname : 'Welcome'}</span>
        </UserProfile>
        {loggedIn ? <NotificationButton onListClick={handleListClick} /> : null}
        <NavList>
          {HEADER_NAV[loginType].map(nav => (
            <li aria-label="header navigation bar" role="button" key={nav.id} onClick={handleListClick}>
              <Link to={nav.to}>{nav.title}</Link>
            </li>
          ))}
        </NavList>
        {loggedIn ? (
          <LogOutButton to={PATH.ROOT} onClick={handleLogOut}>
            <span>로그아웃</span>
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </LogOutButton>
        ) : (
          <LoginCheckMessage>로그인 후 이용이 가능합니다 💡</LoginCheckMessage>
        )}
      </NavbarMenu>
      <BackgroundLayout isActive={isActive} onClick={onChangeIsActive} />
    </NavBarContainer>
  );
};

export default Navbar;

type IsActiveProps = {
  isActive: boolean;
};

const NavBarContainer = styled.div``;

const NavbarMenu = styled.div<IsActiveProps>`
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -10rem;
  min-width: 220px;
  height: 100%;
  overflow-x: hidden;
  background-color: #fff;
  font-size: ${typo.base};
  z-index: 5;
  transition: all 0.2s ease-in;

  ${({ isActive }) =>
    isActive &&
    `
    visibility: visible;
    left:0;
    box-shadow: 2px 0px 14px rgb(197 197 197);
    `}
`;

const NavList = styled.ul`
  li {
    flex: 1 1 auto;
    margin: 1rem 1rem;
    border: 1px solid #fff;
    border-radius: 10px;
    color: ${palette.grey[400]};
    transition: all 0.01s ease-out;
  }

  li:hover,
  li:focus {
    color: ${palette.black[200]};
    background-color: ${palette.grey[100]};
    border: 1px solid ${palette.grey[200]};
  }

  li > a {
    display: block;
    padding: 0.75rem 1rem;
    width: 100%;
  }
`;

const LogOutButton = styled(Link)`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  width: 100%;
  border-radius: 10px 10px 0 0;
  border: 1px solid ${palette.grey[200]};
  background-color: ${palette.grey[100]};
  box-shadow: rgba(29, 34, 53, 0.08) 0 3px 6px 0;
  &:active {
    opacity: 0.9;
  }
`;

const BackgroundLayout = styled.div<IsActiveProps>`
  visibility: hidden;
  transition: 0.5s;

  ${({ isActive }) =>
    isActive &&
    `  
    position: fixed;
    visibility: visible;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgb(33, 38, 41);
    opacity: 0.5;
    `}
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem 1rem 1rem 1rem;
  padding: 0.75rem 1rem;
  background-color: ${palette.grey[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;

  & > div {
    width: 70px;
    height: 70px;
    border-radius: 50%;

    img {
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 4px;
    }
  }

  span {
    display: inline-block;
    padding-top: 1.5rem;
    font-size: ${typo.medium};
    font-weight: 600;
  }
`;

const LoginCheckMessage = styled.p`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  font-size: ${typo.small};
  font-weight: 400;
  text-align: start;
  color: ${palette.grey[500]};
  border: 1px solid ${palette.grey[200]};
  box-shadow: rgba(29, 34, 53, 0.08) 0 3px 6px 0;
`;
