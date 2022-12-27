import React from 'react';
import Spinner from '@/assets/pagingSpinner.gif';
import styled from '@emotion/styled';

interface PagingSpinnerProps {}

const PagingSpinner = (props: PagingSpinnerProps) => {
  return (
    <Container>
      <img src={Spinner} alt="로딩중" width="30%" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default PagingSpinner;
