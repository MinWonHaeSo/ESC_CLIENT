import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ScrollToTop } from '@/hooks/useScollToTop';
import formatter from '@/lib/utils/formatter';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';
import ReservationPrevStepButton from './ReservationPrevStepButton';
import ReservationRentalList from './ReservationStepTwo/ReservationRentalList';
import ReservationButton from './ReservationButton';

interface ReservationStepTwoProps {}

const ReservationStepTwo = ({}: ReservationStepTwoProps) => {
  const rentalItems = useSelector((state: RootState) => state.stadiumReservation.data.items);
  const totalPrice = rentalItems.reduce((acc, curr) => {
    acc += curr.price * curr.count;
    return acc;
  }, 0);

  return (
    <ReservationContainer>
      <ScrollToTop />
      <TitleBlock>
        <ReservationPrevStepButton />
        <Title fontSize={typo.large}>체육관 예약</Title>
      </TitleBlock>
      <SubTitle>대여 가능 상품</SubTitle>
      <ReservationRentalList rentalItems={rentalItems} />
      <RentalItemTotalPrice>
        <span>총 가격</span>
        <span>{formatter.getIntlCurrencyKr(totalPrice)}원</span>
      </RentalItemTotalPrice>
      <ReservationButton />
    </ReservationContainer>
  );
};

export default ReservationStepTwo;

const ReservationContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
  margin-left: 0.5rem;
  color: ${palette.grey[300]};
`;

const RentalItemTotalPrice = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
  padding: 0 2rem;
  span:last-of-type {
    font-weight: 500;
  }
`;
