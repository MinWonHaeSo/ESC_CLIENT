import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import formatter from '@/lib/utils/formatter';
import { setPaymentType } from '@/store/stadiumReservationSlice';
import { useAppDispatch } from '@/store/store';
import styled from '@emotion/styled';
import React from 'react';
import { useState } from 'react';
import Radio from './Radio';
import StyledSeparateLine from './StyledSerparateLine';

interface ReservationPaymentProps {
  totalPaymentPrice: number;
}

const ReservationPayment = ({ totalPaymentPrice }: ReservationPaymentProps) => {
  const [inputStatus, setInputStatus] = useState('');
  const paymentType = [
    { id: 'CASH', method: '현장 결제' },
    { id: 'CARD', method: '카드 결제' },
    { id: 'ACCOUNT', method: '계좌 결제' },
  ];

  const dispatch = useAppDispatch();
  const handlePaymentTypeClick = (id: string, e: React.MouseEvent<HTMLElement>) => {
    setInputStatus(id);
    dispatch(setPaymentType(e.currentTarget.id));
  };

  return (
    <ReservationPaymentBlock>
      <TitleWrapper>
        <h2>결제 방법</h2>
        <span>{formatter.getIntlCurrencyKr(totalPaymentPrice)}</span>
      </TitleWrapper>
      <StyledSeparateLine />
      <PaymentMethod>
        {paymentType.map(type => (
          <li
            key={type.id}
            id={type.id}
            onClick={(e: React.MouseEvent<HTMLLIElement>) => handlePaymentTypeClick(type.id, e)}
          >
            <Radio id={type.id} inputStatus={inputStatus}>
              {type.method}
            </Radio>
          </li>
        ))}
      </PaymentMethod>
    </ReservationPaymentBlock>
  );
};

export default ReservationPayment;

const ReservationPaymentBlock = styled.div`
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid ${palette.grey[200]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: ${palette.black[200]};
    font-size: ${typo.base};
    font-weight: 500;
  }
`;

const PaymentMethod = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;

  li {
    display: flex;
    align-items: center;
    margin-left: 2px;
  }
`;
