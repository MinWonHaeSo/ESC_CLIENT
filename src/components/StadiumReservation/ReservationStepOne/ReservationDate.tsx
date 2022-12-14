import { useCallback } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import formatter from '@/lib/utils/formatter';
import { typo } from '@/lib/styles/typo';
import CustomDate from '../../common/CustomDate';

interface ReservationDateProps {
  trigger: any;
}

const ReservationDate = ({ trigger }: ReservationDateProps) => {
  const reservation = useSelector((state: RootState) => state.stadiumReservation);
  const dispatch = useDispatch();

  const handleChangeDate = useCallback(
    (date: Date) => {
      const yyyymmddDate = formatter.getFullDate(date);
      trigger({ id: reservation.id, date: yyyymmddDate });
    },
    [dispatch],
  );

  return (
    <CustomDate
      value={new Date(reservation.data.reservingDate.replace(/-/g, '-'))}
      onChange={handleChangeDate}
      customInput={<CustomInput />}
    />
  );
};

const CustomInput = styled.input`
  width: 100%;
  padding: 1rem 1rem;
  border-radius: 10px;
  background-color: white;
  height: 60px;
  font-size: ${typo.medium};
  border: 1px solid grey;
`;

export default ReservationDate;
