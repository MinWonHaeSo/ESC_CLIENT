import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useMakeReservationMutation } from '@/api/reservationApi';
import { nextStep } from '@/store/stadiumReservationSlice';
import { RootState, useAppDispatch } from '@/store/store';
import MILLI_SECONDS from '@/constants/milliSeconds';
import PATH from '@/constants/path';
import { ScrollToTop } from '@/hooks/useScollToTop';
import sw from '@/lib/utils/customSweetAlert';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Responsive from '../common/Responsive';
import Loading from '../common/Loading/Loading';
import Button from '../common/atoms/Button';
import Title from '../common/atoms/Title';
import ReservationRentalItemList from './ReservationStepTwo/ReservationRentalItemList';
import ReservationPayment from './ReservationStepThree/ReservationPayment';
import ReservationProfile from './ReservationStepThree/ReservationProfile';
import ReservationInfo from './ReservationStepThree/ReservationInfo';
import ReservationPrevStepButton from './ReservationPrevStepButton';

interface ReservationStepThreeProps {}

const ReservationStepThree = ({}: ReservationStepThreeProps) => {
  const authUser = useSelector((state: RootState) => state.auth);
  const { nickname, email } = authUser;
  const reservationData = useSelector((state: RootState) => state.stadiumReservation);
  const { step, id } = reservationData;
  const dispatch = useAppDispatch();

  const {
    headCount,
    items,
    paymentType: selectedPaymentType,
    pricePerHalfHour,
    reservedTimes,
    reservingDate,
    reservingTimes,
  } = reservationData.data;

  const navigate = useNavigate();
  const [makeReservationAPI, { isLoading }] = useMakeReservationMutation();

  const rentalItemTotalPrice = items.reduce((acc, curr) => {
    acc += curr.price * curr.count;
    return acc;
  }, 0);

  const totalPaymentPrice = pricePerHalfHour * reservingTimes.length + rentalItemTotalPrice;

  const handlePayClick = async () => {
    const finalReservationData = {
      date: reservingDate,
      headCount,
      pricePerHalfHour,
      items: items,
      totalPrice: totalPaymentPrice,
      reservedTimes: reservingTimes,
      email,
      paymentType: selectedPaymentType,
    };

    if (selectedPaymentType.length === 0) {
      return sw.toast.warn('?????? ????????? ???????????????.');
    }

    try {
      const response = await makeReservationAPI({ id, finalReservationData });
      if (response) {
        sw.toast.success('????????? ??????????????? ?????????????????????.');
        setTimeout(() => navigate(PATH.ME_RENTAL_LIST), MILLI_SECONDS.one);
        dispatch(nextStep(step - 2));
      }
    } catch {
      sw.toast.error('????????? ????????? ??????????????????.');
      console.error('????????? ??????????????????.');
    }
  };

  if (isLoading) {
    return <Loading message={'?????? ????????????'} />;
  }

  return (
    <ReservationContainer>
      <ScrollToTop />
      <TitleContainer>
        <ReservationPrevStepButton />
        <Title fontSize={typo.large}>????????? ?????? / ??????</Title>
      </TitleContainer>
      <ReservationProfile nickname={nickname} email={email} />
      <ReservationInfo infoData={reservationData.data} price={{ rentalItemTotalPrice, totalPaymentPrice }} />
      <ReservationRentalItemList rentalItems={items} step={step} />
      <ReservationPayment totalPaymentPrice={totalPaymentPrice} />
      <Agreeement>?????? ????????? ??????????????????, ?????? ????????? ???????????????.</Agreeement>
      <ButtonWrapper>
        <Button type={'button'} size={'large'} backgroundColor={`${palette.black[100]}`} onClick={handlePayClick}>
          ????????????
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
