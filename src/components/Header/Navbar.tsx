import HEADER_NAV from '@/constants/headerNav';
import PATH from '@/constants/path';
import palette from '@/lib/styles/palette';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeUserType, checkLoggedIn, loggedOut } from '@/store/authSlice';
import sw from '@/lib/utils/customSweetAlert';
import { UserType } from '@/types/userType';
import { useLogoutMutation } from '@/api/authApi';
import { deleteCookie, getCookie } from '@/lib/utils/cookies';

interface NavbarProps {
  isActive: boolean;
  onChangeIsActive: () => void;
}

const Navbar = ({ isActive, onChangeIsActive }: NavbarProps) => {
  const [loginType, setLoginType] = useState<UserType>('USER'); //user, manager
  const dispatch = useAppDispatch();

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const userType = useSelector((state: RootState) => state.auth.type);
  const [logout] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      const refreshToken = getCookie('refreshToken');
      const response = await logout(refreshToken).unwrap();
      if (response.statusCode === 200) {
        dispatch(
          loggedOut({
            type: 'USER',
            email: '',
            name: '',
            nickname: '',
            image: '',
            accessToken: '',
            refreshToken: '',
            loggedIn: false,
          }),
        );
        onChangeIsActive();
        deleteCookie('refreshToken', { path: '/' });
        console.log(getCookie('refreshToken'));
        sw.toast.success('로그아웃 되었습니다.');
      }
    } catch {
      console.error('로그아웃 하는데 문제가 생겼습니다.');
    }
  };

  const handleListClick = () => {
    onChangeIsActive();
  };

  useEffect(() => {
    setLoginType(userType);
  }, [userType]);

  return (
    <NavbarBlock>
      <NavbarMenu isActive={isActive}>
        <UserProfile>
          <div>
            <img src="src/assets/defaultUserImage.png" alt="프로필" width="70px" height="70px" />
          </div>
          <span>닉네임</span>
        </UserProfile>
        {HEADER_NAV[loginType].map(nav => (
          <li key={nav.id} onClick={handleListClick}>
            <Link to={nav.to}>{nav.title}</Link>
          </li>
        ))}
        {loggedIn && (
          <LogOutButton to={PATH.ROOT} onClick={handleLogOut}>
            로그아웃
          </LogOutButton>
        )}
      </NavbarMenu>
      <BackgroundLayout isActive={isActive} onClick={onChangeIsActive} />
    </NavbarBlock>
  );
};

type IsActiveProps = {
  isActive: boolean;
};

const NavbarBlock = styled.div``;

const NavbarMenu = styled.ul<IsActiveProps>`
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -10rem;
  height: 100%;
  overflow-x: hidden;
  background-color: #fff;
  font-size: 15px;
  z-index: 2;
  transition: all 0.2s ease-in;

  & > li {
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

  ${({ isActive }) =>
    isActive &&
    `
    visibility: visible;
    left:0;
    box-shadow: 2px 0px 14px rgb(197 197 197);
    `}
`;

const LogOutButton = styled(Link)`
  position: absolute;
  bottom: 0;
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: 10px 10px 0 0;
  border: 1px solid ${palette.grey[200]};
  background-color: ${palette.grey[100]};
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
    background-color: rgba(33, 38, 41);
    opacity: 0.5;
    `}
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin: 2rem 2rem 4rem 2rem;

  & > div {
    width: 70px;
    height: 70px;
    border-radius: 50%;

    img {
      border-radius: 50%;
      box-shadow: 5px 5px 10px rgba(57, 60, 64, 0.8);
    }
  }

  span {
    font-size: 18px;
    font-weight: 600;
  }
`;

export default Navbar;
