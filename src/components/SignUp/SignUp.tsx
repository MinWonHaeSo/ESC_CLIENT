import styled from '@emotion/styled';
import Responsive from '../common/Responsive';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import TabMenu from '../common/TabMenu';
import SignUpForm from './SignUpForm';
import InsertImage from '../common/InsertImage';

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  return (
    <SignUpBlock>
      <Title fontSize={`${typo.large}`} marginLeft={'20px'} marginTop={'20px'}>
        회원가입
      </Title>
      <TabMenu />
      <InsertImage editDisabled={false} />
      <SignUpForm />
    </SignUpBlock>
  );
};

export default SignUp;

const SignUpBlock = styled.section`
  overflow-y: scroll;
  ${Responsive.ResponsiveWrapper}
`;
