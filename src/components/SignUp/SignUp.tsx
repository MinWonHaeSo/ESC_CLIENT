import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import Responsive from '../common/Responsive';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import TabMenu from '../common/TabMenu';
import SignUpForm from './SignUpForm';
import InsertImage from '../common/InsertImage';

const SignUp = () => {
  return (
    <SignUpBlock>
      <Title fontSize={`${typo.large}`} marginLeft={'20px'} marginTop={'20px'}>
        회원가입
      </Title>
      <TabMenu />
      <InsertImage />
      <SignUpForm />
    </SignUpBlock>
  );
};

export default SignUp;

const SignUpBlock = styled.section`
  overflow-y: scroll;
  ${Responsive.ResponsiveWrapper}
`;
