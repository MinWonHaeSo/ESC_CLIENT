import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import media from '@/lib/styles/media';

import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';

interface Props {}

const Header = (props: Props) => {
  return (
    <HeaderBlock>
      {/* 토글 버튼을 구현해야 한다면 로고를 가운데로 밀고 왼쪽에다 배치 */}
      <Link to="/">
        <NavbarLogo width="50px" height="50px" />
      </Link>
      <NavbarMenu>
        <li>
          <Link to="/">상품</Link>
        </li>
        <li>
          <Link to="/">체육관</Link>
        </li>
      </NavbarMenu>

      {/* 내정보 fontAwesome 아이콘 아이템 드랍다운 작업 */}
      <div>내정보</div>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.nav`
  display: flex;
  max-width: 1280px;
  background-color: #fff;
  margin: 0 auto;
  padding: 0.5rem 3rem;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;

  & > a {
    width: 50px;
    height: 50px;
  }

  ${media.large} {
    max-width: 765px;
  }
`;

const NavbarMenu = styled.ul`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: 5rem;

  li {
    border-radius: 10px;
    padding: 12px 12px;
  }

  li:hover {
    background-color: ${palette.primary['point']};
    color: #fff;
    transition: all 0.2s ease-in-out;
  }
`;

export default Header;
