import styled from '@emotion/styled';
import Spinner from '@/assets/spinner.gif';
import media from '@/lib/styles/media';
import { typo } from '@/lib/styles/typo';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <Background>
      <p>{message}</p>
      <img src={Spinner} alt="로딩중" width="30%" />
    </Background>
  );
};

export default Loading;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0;
  background: rgba(254, 254, 254, 0.4);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${typo.medium};
    font-weight: 500;
  }

  img {
    ${media.mediumMin} {
      width: 10%;
    }
  }
`;
