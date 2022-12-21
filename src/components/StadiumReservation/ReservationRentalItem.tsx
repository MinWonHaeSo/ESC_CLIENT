import React from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

type Props = {};

const ReservationRentalItem = (props: Props) => {
  return (
    <ReservationRentalItemContainer>
      <div className="rental-item-container">
        <div className="checkbox-container">
          <input type="checkbox" />
        </div>
        <div className="image-container">
          <img src="https://via.placeholder.com/80x80" alt="" width="80" height="80" />
        </div>
        <div className="item-info-container">
          <span>이름 : 축구화</span>
          <div className="count-container">
            <span>갯수 : </span>
            <button className="btn count-minus">-</button>
            <span>0</span>
            <button className="btn count-plus">+</button>
          </div>
          <span>
            가격 : <strong>13,000원</strong>
          </span>
        </div>
      </div>
      <div className="rental-item-container">
        <div className="checkbox-container">
          <input type="checkbox" />
        </div>
        <div className="image-container">
          <img src="https://via.placeholder.com/80x80" alt="" width="80" height="80" />
        </div>
        <div className="item-info-container">
          <span>이름 : 축구화</span>
          <div className="count-container">
            <span>갯수 : </span>
            <button className="btn count-minus">-</button>
            <span>0</span>
            <button className="btn count-plus">+</button>
          </div>
          <span>
            가격 : <strong>13,000원</strong>
          </span>
        </div>
      </div>
      <div className="rental-item-container">
        <div className="checkbox-container">
          <input type="checkbox" />
        </div>
        <div className="image-container">
          <img src="https://via.placeholder.com/80x80" alt="" width="80" height="80" />
        </div>
        <div className="item-info-container">
          <span>이름 : 축구화</span>
          <div className="count-container">
            <span>갯수 : </span>
            <button className="btn count-minus">-</button>
            <span>0</span>
            <button className="btn count-plus">+</button>
          </div>
          <span>
            가격 : <strong>13,000원</strong>
          </span>
        </div>
      </div>
    </ReservationRentalItemContainer>
  );
};

const ReservationRentalItemContainer = styled.div`
  height: 400px;
  padding: 1rem 0.5rem;
  overflow-y: scroll;
  margin-top: 1rem;

  .rental-item-container {
    display: flex;
    width: 100%;
    height: 110px;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 10px;
    box-shadow: 3px 2px 10px rgb(197 197 197);
    align-items: center;
  }

  .rental-item-container + .rental-item-container {
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
