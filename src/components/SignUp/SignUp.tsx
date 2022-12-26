import styled from '@emotion/styled';
import Responsive from '../common/Responsive';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import TabMenu from '../common/TabMenu';
import SignUpForm from './SignUpForm';

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  return (
    <SignUpContainer>
      <Title fontSize={`${typo.large}`} marginLeft={'32px'} marginTop={'20px'}>
        회원가입
      </Title>
      <TabMenu />
      <SignUpForm />
    </SignUpContainer>
  );
};

export default SignUp;

const SignUpContainer = styled.section`
  overflow-y: scroll;
  ${Responsive.ResponsiveWrapper}
`;
