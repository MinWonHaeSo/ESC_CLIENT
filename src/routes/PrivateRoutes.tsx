import Header from '@/components/Header/Header';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { Outlet } from 'react-router';

interface PrivateRoutesProps {}

const PrivateRoutes = (props: PrivateRoutesProps) => {
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
    </>
  );
};

export default PrivateRoutes;

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid ${palette.grey[100]};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.125);
  background-color: #fff;

  z-index: 9999;
`;

const MainWrapper = styled.main`
  padding-top: 5rem;
`;
