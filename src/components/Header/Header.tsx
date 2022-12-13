import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import Responsive from '@/components/common/Responsive';
import Navbar from './Navbar';
import palette from '@/lib/styles/palette';
import PATH from '@/constants/path';
import usePathHeaderOnlyLogo from '@/hooks/usePathHeaderOnlyLogo';
import { useGoBack } from '@/hooks/useGoBack';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useCheckLogin } from '@/hooks/useCheckLogin';

interface HomeProps {}

const Header = (props: HomeProps) => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [isActive, setIsActive] = useState(false);
  const checkHeader = usePathHeaderOnlyLogo();

  const goBack = useGoBack();
  const handleChangeIsActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    useCheckLogin();
  }, []);

  return (
    <HeaderBlock>
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
      {loggedIn || checkHeader ? null : (
        <UserMenu>
          <Link to={PATH.LOGIN}>로그인</Link>
        </UserMenu>
      )}
    </HeaderBlock>
  );
};

const HeaderBlock = styled.nav`
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

export default Header;
