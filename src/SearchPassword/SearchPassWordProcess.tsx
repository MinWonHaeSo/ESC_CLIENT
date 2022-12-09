import styled from '@emotion/styled';

interface SearchPasswordProcessProps {
  index: number;
  component: JSX.Element;
}

const SearchPasswordProcess = ({ index, component }: SearchPasswordProcessProps) => {
  return (
    <>
      <Index>{index}</Index>
      {component}
    </>
  );
};

export default SearchPasswordProcess;

const Index = styled.span`
  display: none;
`;
