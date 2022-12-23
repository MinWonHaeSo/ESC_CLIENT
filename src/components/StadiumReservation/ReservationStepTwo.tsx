import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ReservationButton from './ReservationButton';
import ReservationPrevStepButton from './ReservationPrevStepButton';
import ReservationRentalList from './ReservationRentalList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ReservationStepTwoProps {}

const ReservationStepTwo = ({}: ReservationStepTwoProps) => {
  const rentalItems = useSelector((state: RootState) => state.stadiumReservation.data.items);

  return (
    <ReservationContainer>
      <TitleContainer>
        <ReservationPrevStepButton />
        <Title fontSize={typo.large}>체육관 예약</Title>
      </TitleContainer>
      <SubTitle>대여 가능 상품</SubTitle>
      <ReservationRentalList rentalItems={rentalItems} />
      <ReservationButton />
    </ReservationContainer>
  );
};

const ReservationContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
  margin-left: 0.5rem;
  color: ${palette.grey[300]};
`;

export default ReservationStepTwo;
