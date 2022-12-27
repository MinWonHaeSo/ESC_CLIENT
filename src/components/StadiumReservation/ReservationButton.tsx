import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '@/store/stadiumReservationSlice';
import { RootState } from '@/store/store';
import sw from '@/lib/utils/customSweetAlert';
import palette from '@/lib/styles/palette';
import Button from '../common/atoms/Button';

interface ReservationButtonProps {}

const ReservationButton = (props: ReservationButtonProps) => {
  const step = useSelector((state: RootState) => state.stadiumReservation.step);
  const dispatch = useDispatch();
  const reservationData = useSelector((state: RootState) => state.stadiumReservation.data);
  const { reservingTimes: selectedDate, items: rentalItems } = reservationData;

  const handleNextStep = () => {
    if (selectedDate.length === 0) {
      return sw.toast.warn('예약 시간을 선택해 주세요.');
    }
    if (
      step === 2 &&
      rentalItems.some(item => {
        return item.toggle === false && item.count > 0;
      })
    ) {
      return sw.toast.warn('상품을 대여하고 싶은 경우 체크해 주세요.');
    }
    dispatch(nextStep(step + 1));
  };

  return (
    <ReservationButtonContainer>
      <Button size={'large'} type={'button'} backgroundColor={palette.black[100]} onClick={handleNextStep}>
        다 음
      </Button>
    </ReservationButtonContainer>
  );
};
const ReservationButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export default ReservationButton;
