import styled from '@emotion/styled';
import { GetReservationStadiumTimeReseponse, reservationApi } from '@/api/reservationApi';
import { ScrollToTop } from '@/hooks/useScollToTop';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Responsive from '../common/Responsive';
import Title from '../common/atoms/Title';
import ReservationAccordion from './ReservationStepOne/ReservationAccordion';
import ReservationButton from './ReservationButton';
import ReservationPerson from './ReservationStepOne/ReservationPerson';
import ReservationDate from './ReservationStepOne/ReservationDate';
import TimeSelectList from './ReservationStepOne/TImeSelectList';

interface ReservationStepOneProps {
  data: GetReservationStadiumTimeReseponse;
}

const ReservationStepOne = ({ data }: ReservationStepOneProps) => {
  const [trigger] = reservationApi.endpoints.getReservationStadiumTime.useLazyQuery();

  return (
    <ReservationContainer>
      <ScrollToTop />
      <Title fontSize={typo.large}>체육관 예약</Title>
      <SubTitle>날짜, 시간, 인원</SubTitle>
      <ReservationInfo>
        <ReservationDate trigger={trigger} />
        <ReservationAccordion component={<TimeSelectList openTime={data.openTime} closeTime={data.closeTime} />} />
        <ReservationPerson />
      </ReservationInfo>
      <ReservationButton />
    </ReservationContainer>
  );
};

const ReservationContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
  margin-top: 1rem;
`;

const SubTitle = styled.h4`
  margin-top: 4px;
  color: ${palette.grey[300]};
`;

const ReservationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  .react-datepicker-popper {
    right: -1rem !important;
    left: 1rem !important;
  }

  .react-datepicker {
    width: 92%;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__time-container {
    width: 100%;
    .react-datepicker__time-box {
      width: 100%;
    }
  }
`;

export default ReservationStepOne;
