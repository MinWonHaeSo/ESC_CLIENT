import HEADER_NAV from '@/constants/headerNav';
import PATH from '@/constants/path';
import palette from '@/lib/styles/palette';
import { RootState, useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loggedOut } from '@/store/authSlice';
import sw from '@/lib/utils/customSweetAlert';
import { UserType } from '@/types/userType';
import { useLogoutMutation } from '@/api/authApi';
import { deleteCookie, getCookie } from '@/lib/utils/cookies';
import { removeAuthToken } from '@/lib/utils/token';
import { typo } from '@/lib/styles/typo';

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
        deleteCookie('refreshToken', { path: '/' });

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
    if (!loggedIn) {
      sw.toast.warn('로그인 해주세요');
    }
    onChangeIsActive();
  };

  useEffect(() => {
    setLoginType(type);
  }, [type]);

  return (
    <NavbarBlock>
      <NavbarMenu isActive={isActive}>
        <UserProfile>
          <div>
            <img src={image ? image : 'src/assets/defaultProfileIcon.svg'} alt="프로필" width="70px" height="70px" />
          </div>
          <span>{nickname ? nickname : 'someone'}</span>
        </UserProfile>
        {HEADER_NAV[loginType].map(nav => (
          <li key={nav.id} onClick={handleListClick}>
            <Link to={loggedIn ? nav.to : PATH.LOGIN}>{nav.title}</Link>
          </li>
        ))}
        {loggedIn && (
          <LogOutButton to={PATH.ROOT} onClick={handleLogOut}>
            <span>로그아웃</span>
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </LogOutButton>
        )}
      </NavbarMenu>
      <BackgroundLayout isActive={isActive} onClick={onChangeIsActive} />
    </NavbarBlock>
  );
};

export default Navbar;

type IsActiveProps = {
  isActive: boolean;
};

const NavbarBlock = styled.div``;

const NavbarMenu = styled.ul<IsActiveProps>`
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -10rem;
  min-width: 220px;
  height: 100%;
  overflow-x: hidden;
  background-color: #fff;
  font-size: ${typo.base};

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
    background-color: rgba(33, 38, 41);
    opacity: 0.5;
    `}
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin: 1rem 1rem 4rem 1rem;
  padding: 0.75rem 1rem;
  background-color: ${palette.grey[100]};
  box-shadow: rgba(29, 34, 53, 0.08) 0 3px 6px 0;
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
    font-size: ${typo.medium};
    font-weight: 600;
  }
`;
