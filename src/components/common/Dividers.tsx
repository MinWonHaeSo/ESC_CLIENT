import React from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

const Dividers = () => {
  return <Line />;
};

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.grey[200]};
  margin: 1rem 0;
`;
export default Dividers;
