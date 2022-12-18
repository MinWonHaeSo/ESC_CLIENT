import React from 'react';
import styled from '@emotion/styled';
import Review from '@/components/Review/Review';
import Dividers from '@/components/common/Dividers';
import Detail from '@/components/StadiumDetail/Detail';
import Responsive from '@/components/common/Responsive';
import { useParams } from 'react-router-dom';

const StadiumDetailPage = () => {
  const { id } = useParams();

  return (
    <Container>
      <Detail stadiumId={id!} />
      <Dividers />
      <Review stadiumId={id!} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 0;

  ${Responsive.ResponsiveWrapper}
`;

export default StadiumDetailPage;
