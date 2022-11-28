import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import Responsive from '@/components/common/Responsive';
import Navbar from './Navbar';
import palette from '@/lib/styles/palette';
import PATH from '@/constants/path';
import usePathHeaderOnlyLogo from '@/hooks/usePathHeaderOnlyLogo';

interface HomeProps {}

const Header = (props: HomeProps) => {
  const [isActive, setIsActive] = useState(false);
  const checkHeader = usePathHeaderOnlyLogo();

  const handleChangeIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <HeaderBlock>
      {checkHeader ? (
        '<'
      ) : (
        <ToggleMenuBar onClick={handleChangeIsActive}>
          <i className="fa-solid fa-bars"></i>
        </ToggleMenuBar>
      )}
      <LogoBlock>
        <Link to={PATH.ROOT} aria-label="Easy Sports Club 로고">
          <NavbarLogo width="80px" height="80px" />
        </Link>
      </LogoBlock>
      <Navbar isActive={isActive} onChangeIsActive={handleChangeIsActive} />
      {checkHeader ? null : (
        <UserMenu>
          <Link to={PATH.LOGIN}>로그인</Link>
        </UserMenu>
      )}
    </HeaderBlock>
  );
};

const HeaderBlock = styled.nav`
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

const ToggleMenuBar = styled.div`
  padding: 0.25rem;
  i {
    font-size: 24px;
  }
`;

const LogoBlock = styled.div`
  position: absolute;
  left: 49%;
  top: 55%;
  transform: translate(-50%, -50%);
`;

const UserMenu = styled.div`
  li:hover {
    background-color: ${palette.primary['point']};
    color: #fff;
    transition: all 0.2s ease-in-out;
  }
`;

export default Header;
