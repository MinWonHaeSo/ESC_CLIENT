import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Review from '@/components/Review/Review';
import Dividers from '@/components/common/Dividers';
import Detail from '@/components/StadiumDetail/Detail';
import Responsive from '@/components/common/Responsive';

const StadiumDetailPage = () => {
  const detail = useSelector((state: RootState) => state.stadiumDetail);

  return (
    <Container>
      <Detail detail={detail} />
      <Dividers />
      <Review />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 0;

  ${Responsive.ResponsiveWrapper}
`;

export default StadiumDetailPage;
