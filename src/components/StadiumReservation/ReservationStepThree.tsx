import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { RootState } from '@/store/store';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../common/atoms/Button';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ReservationPrevStepButton from './ReservationPrevStepButton';
import ReservationInfo from './ReservationStepThree/ReservationInfo';
import ReservationPayment from './ReservationStepThree/ReservationPayment';
import ReservationProfile from './ReservationStepThree/ReservationProfile';
import ReservationRentalItemList from './ReservationStepThree/ReservationRentalItemList';

interface ReservationStepThreeProps {}

const ReservationStepThree = ({}: ReservationStepThreeProps) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [rentalItemOpen, setRentalItemOpen] = useState(false);
  const authUser = useSelector((state: RootState) => state.auth);
  const { nickname, email } = authUser;
  const reservationData = useSelector((state: RootState) => state.stadiumReservation);
  const step = reservationData.step;
  const { items } = reservationData.data;

  const handleReserveInfoToggle = () => {
    setInfoOpen(prev => !prev);
  };

  const handleRentalItemToggle = () => {
    setRentalItemOpen(prev => !prev);
  };

  const handlePayClick = () => {};

  return (
    <ReservationContainer>
      <TitleContainer>
        <ReservationPrevStepButton />
        <Title fontSize={typo.large}>체육관 예약 / 결제</Title>
      </TitleContainer>
      <ReservationProfile nickname={nickname} email={email} />
      <ReservationInfo
        infoOpen={infoOpen}
        onReserveInfoToggle={handleReserveInfoToggle}
        infoData={reservationData.data}
      />
      <ReservationRentalItemList
        rentalItemOpen={rentalItemOpen}
        onRentalItemToggle={handleRentalItemToggle}
        rentalItems={items}
        step={step}
      />
      <ReservationPayment />
      <Agreeement>예약 내역을 확인하였으며, 정보 제공에 동의합니다.</Agreeement>
      <ButtonWrapper>
        <Button type={'button'} size={'large'} backgroundColor={`${palette.black[100]}`} onClick={handlePayClick}>
          예약하기
        </Button>
      </ButtonWrapper>
    </ReservationContainer>
  );
};

export default ReservationStepThree;

const ReservationContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;

  h2 {
    font-size: ${typo.medium};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 1rem;
`;

const Agreeement = styled.p`
  font-size: ${typo.small};
  text-align: center;
  color: ${palette.grey[500]};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
