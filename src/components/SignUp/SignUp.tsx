import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import Responsive from '../common/Responsive';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import TabMenu from '../common/TabMenu';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <SignUpBlock>
      <Title fontSize={`${typo.large}`}>회원가입</Title>
      <TabMenu />
      <ImgBlock>
        <Img src="/" alt="프로필" />
        <PlusButton>
          <i className="fa-solid fa-plus"></i>
        </PlusButton>
      </ImgBlock>
      <SignUpForm />
    </SignUpBlock>
  );
};

export default SignUp;

const SignUpBlock = styled.section`
  overflow: scroll;
  ${Responsive.ResponsiveWrapper}
`;

const ImgBlock = styled.div`
  position: relative;
  margin: 40px auto 0;
  width: 120px;
  height: 120px;
  background-color: ${palette.grey[200]};
  border-radius: 50%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
`;

const PlusButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;

  i {
    font-size: 24px;
  }
`;
