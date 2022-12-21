import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { RentalItemsType } from '@/api/reservationApi';
import { useDispatch } from 'react-redux';
import { changeRentalItemCount, RentalItemsToggleType, toggleRentalItem } from '@/store/stadiumReservationSlice';
import formatter from '@/lib/utils/formatter';

interface ReservationRentalItemProps {
  item: RentalItemsToggleType;
}

const ReservationRentalItem = ({ item }: ReservationRentalItemProps) => {
  const dispatch = useDispatch();

  const handleToggleItem = useCallback(
    (item: RentalItemsType) => {
      dispatch(toggleRentalItem(item));
    },
    [dispatch],
  );

  const handleChangeItemCountPlus = useCallback(
    (id: string, count: number) => {
      dispatch(changeRentalItemCount({ id, count }));
    },
    [dispatch],
  );

  const handleChangeItemCountMinus = useCallback(
    (id: string, count: number) => {
      if (!item.count) return;
      dispatch(changeRentalItemCount({ id, count }));
    },
    [dispatch, item.count],
  );

  return (
    <RentalItemContainer>
      <div className="checkbox-container">
        <input type="checkbox" checked={item.toggle!} onChange={() => handleToggleItem(item)} />
      </div>
      <div className="image-container">
        <img src={item.imgUrl ? item.imgUrl : `https://via.placeholder.com/80x80`} alt="" width="80" height="80" />
      </div>
      <div className="item-info-container">
        <span>이름 : {item.name}</span>
        <div className="count-container">
          <span>갯수 : </span>
          <button className="btn count-minus" onClick={() => handleChangeItemCountMinus(item.id, item.count - 1)}>
            -
          </button>
          <span>{item.count}</span>
          <button className="btn count-plus" onClick={() => handleChangeItemCountPlus(item.id, item.count + 1)}>
            +
          </button>
        </div>
        <span>
          가격 : <strong>{formatter.getIntlCurrencyKr(item.price)}</strong>
        </span>
      </div>
    </RentalItemContainer>
  );
};

const RentalItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 3px 2px 10px rgb(197 197 197);
  align-items: center;

  & + & {
    margin-top: 1rem;
  }

  .checkbox-container {
    margin-bottom: auto;
  }

  .image-container {
    img {
      border-radius: 10px;
    }
  }

  .item-info-container {
    height: 80px;
  }
  .count-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    .btn {
      width: 35px;
      border: 1px solid black;
      border-radius: 10px;
      font-size: 18px;
    }
  }
`;

export default ReservationRentalItem;
