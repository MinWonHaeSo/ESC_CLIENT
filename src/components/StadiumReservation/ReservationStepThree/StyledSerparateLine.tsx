import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';

const StyledSeparateLine = () => {
  return <Line></Line>;
};

export default StyledSeparateLine;

const Line = styled.div`
  margin: 0.25rem 0 0.4rem 0.25rem;
  padding: 0;
  width: 98%;
  height: 1px;
  background-color: ${palette.grey[200]};
`;
