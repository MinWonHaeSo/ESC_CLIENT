import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { RootState } from '@/store/store';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const userType = useSelector((state: RootState) => state.user.type);
  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainWrapper>
        <Outlet />
      </MainWrapper>
      <FooterWrapper userType={userType}>
        <Footer />
      </FooterWrapper>
    </>
  );
};

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

const FooterWrapper = styled.footer<{ userType: 'USER' | 'MANAGER' }>`
  ${media.xsmallMin} {
    margin-top: 18rem;
    ${({ userType }) => userType === 'MANAGER' && `margin-top: 26.8rem`};
  }
`;
export default Layout;
