import styled from '@emotion/styled';
import Spinner from '@/assets/spinner.gif';
import { typo } from '@/lib/styles/typo';

const Loading = () => {
  return (
    <Background>
      {/* <LoadingText>Loading...</LoadingText> */}
      <img src={Spinner} alt="로딩중" width="30%" />
    </Background>
  );
};

export default Loading;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: -15%;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  font-size: ${typo.medium};
  font-weight: 600;
`;
