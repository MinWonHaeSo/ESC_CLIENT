import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import Responsive from '@/components/common/Responsive';
import Navbar from './Navbar';
import palette from '@/lib/styles/palette';

interface HomeProps {}

const Header = (props: HomeProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleChangeIsActive = () => {
    setIsActive(!isActive);
  };
  return (
    <HeaderBlock>
      <ToggleMenuBar onClick={handleChangeIsActive}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </ToggleMenuBar>
      <LogoBlock>
        <Link to="/" aria-label="Easy Sports Club 로고">
          <NavbarLogo width="50px" height="50px" />
        </Link>
      </LogoBlock>
      <Navbar isActive={isActive} onChangeIsActive={handleChangeIsActive} />
      <UserMenu>
        <Link to="login">로그인</Link>
      </UserMenu>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.nav`
  display: flex;
  height: 50px;
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
  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: black;
    transition: all 0.3s ease-in-out;
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
