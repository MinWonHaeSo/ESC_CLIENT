import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import Responsive from '../common/Responsive';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import TabMenu from '../common/TabMenu';

const SignUp = () => {
  return (
    <SignUpBlock>
      <Title fontSize={`${typo.large}`}>회원가입</Title>
      <TabMenu />
      <ImgBlock>
        <Img src="" alt="프로필" />
      </ImgBlock>
    </SignUpBlock>
  );
};

export default SignUp;

const SignUpBlock = styled.section`
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
