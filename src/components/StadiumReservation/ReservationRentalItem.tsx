import { useCallback } from 'react';
import styled from '@emotion/styled';
import { RentalItemsType } from '@/api/reservationApi';
import { useDispatch } from 'react-redux';
import { changeRentalItemCount, RentalItemsToggleType, toggleRentalItem } from '@/store/stadiumReservationSlice';
import formatter from '@/lib/utils/formatter';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ReservationRentalItemProps {
  item: RentalItemsToggleType;
  step?: number;
}

const ReservationRentalItem = ({ item, step }: ReservationRentalItemProps) => {
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
        {step === 3 ? null : (
          <>
            <input type="checkbox" id="checkbox" checked={item.toggle!} onChange={() => handleToggleItem(item)} />{' '}
            <label htmlFor="checkbox"></label>
          </>
        )}
      </div>
      <div className="image-container">
        <img src={item.imgUrl ? item.imgUrl : `https://via.placeholder.com/80x80`} alt="" width="80" height="80" />
      </div>
      <div className="item-info-container">
        <span>이름 : {item.name}</span>
        <div className="count-container">
          <span>개수 : </span>
          {step === 3 ? null : (
            <button className="btn count-minus" onClick={() => handleChangeItemCountMinus(item.id, item.count - 1)}>
              <i className="fa-solid fa-minus" />
            </button>
          )}
          <span>{item.count}</span>
          {step === 3 ? null : (
            <button className="btn count-plus" onClick={() => handleChangeItemCountPlus(item.id, item.count + 1)}>
              <i className="fa-solid fa-plus" />
            </button>
          )}
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
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 4px;
  align-items: center;

  & + & {
    margin-top: 1rem;
  }

  .checkbox-container {
    margin-bottom: auto;

    input[type='checkbox'] {
      width: 18px;
      height: 18px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: #fff;
      border-radius: 4px;
      border: 1px solid ${palette.grey[300]};
      cursor: pointer;
    }

    input[type='checkbox']::after {
      content: '';
      display: none;
      top: 20%;
      left: 37%;
      width: 15%;
      height: 40%;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      position: relative;
      transform: rotate(45deg);
    }

    input[type='checkbox']:checked {
      border: #fff;
      background-color: ${palette.primary['green']};
    }
    input[type='checkbox']:checked::after {
      display: block;
    }
  }

  .image-container {
    img {
      border-radius: 10px;
    }
  }

  .item-info-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 6px;
  }
  .count-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 24px;
      border: 1px solid ${palette.grey[300]};
      border-radius: 10px;
      font-size: 16px;

      &:active {
        border: 1px solid ${palette.black[200]};
      }

      i {
        font-size: ${typo.small};
      }
    }
  }
`;

export default ReservationRentalItem;
