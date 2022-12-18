import styled from '@emotion/styled';
import Spinner from '@/assets/spinner.gif';

const Loading = () => {
  return (
    <Background>
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
`;
