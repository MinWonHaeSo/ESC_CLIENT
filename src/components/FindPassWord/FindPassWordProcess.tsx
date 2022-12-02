import styled from '@emotion/styled';

interface FindPassWordProcessProps {
  index: number;
  component: JSX.Element;
}

const FindPassWordProcess = ({ index, component }: FindPassWordProcessProps) => {
  return (
    <>
      <Index>{index}</Index>
      {component}
    </>
  );
};

export default FindPassWordProcess;

const Index = styled.span`
  display: none;
`;
