import { Link } from 'react-router-dom';
import { ReactComponent as NavbarLogo } from '@/assets/esc-logo.svg';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import Responsive from '../common/Responsive';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import TabMenu from '../common/TabMenu';

const SignUp = () => {
  return (
    <SignUpBlock>
      <SignUpHeader>
        <Link to="/">
          <NavbarLogo width="80px" height="80px" />
        </Link>
      </SignUpHeader>
      <SignUpSection>
        <Title fontSize={`${typo.large}`}>회원가입</Title>
        <TabMenu />
        <ImgBlock>
          <Img src="" alt="프로필" />
        </ImgBlock>
      </SignUpSection>
    </SignUpBlock>
  );
};

export default SignUp;

const SignUpBlock = styled.div``;

const SignUpHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 3rem;
  border-bottom: 1px solid ${palette.grey[100]};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.125);
  background-color: #fff;

  a {
    display: flex;
    align-items: center;
  }
`;

const SignUpSection = styled.section`
  ${Responsive.ResponsiveWrapper}
`;

const ImgBlock = styled.div`
  position: relative;
  margin: 20px auto 0;
  width: 120px;
  height: 120px;
  background-color: ${palette.grey[200]};
  border-radius: 50%;
`;

const Img = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
