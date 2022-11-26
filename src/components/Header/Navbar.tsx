import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isActive: boolean;
  onChangeIsActive: () => void;
}

const Navbar = ({ isActive, onChangeIsActive }: NavbarProps) => {
  return (
    <div>
      <NavbarMenu isActive={isActive}>
        <UerProfile>
          <div>
            <img src="src/assets/defaultUserImage.png" alt="프로필" width="70px" height="70px" />
          </div>
          <span>닉네임</span>
        </UerProfile>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
        <li>
          <Link to="/">대여 내역</Link>
        </li>
        <li>
          <Link to="/">최근 본 체육관</Link>
        </li>
        <li>
          <Link to="/">찜한 체육관</Link>
        </li>
      </NavbarMenu>
      <BackgroundLayout isActive={isActive} onClick={onChangeIsActive} />
    </div>
  );
};

type IsActiveProps = {
  isActive: boolean;
};

const NavbarMenu = styled.ul<IsActiveProps>`
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -10rem;
  height: 100%;
  overflow-x: hidden;
  background-color: #fff;
  font-size: 15px;
  z-index: 3;
  transition: 0.2s ease-in;

  & > li {
    transition: 0.1s;
    margin: 1rem 1rem;
    padding: 0.5rem 1rem;
    color: ${palette.grey[200]};
    flex: 1 1 auto;
  }
  ${({ isActive }) =>
    isActive &&
    `
    visibility: visible;
    left:0;
    box-shadow: 2px 0px 14px rgb(197 197 197);

    `}
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

const UerProfile = styled.div`
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
