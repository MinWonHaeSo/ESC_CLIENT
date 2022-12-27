import { useState } from 'react';
import styled from '@emotion/styled';
import { StadiumReservationStateData } from '@/store/stadiumReservationSlice';
import formatter from '@/lib/utils/formatter';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import StyledSeparateLine from './StyledSerparateLine';
import AccordionToggleButton from './ToggleButton';

interface ReservationInfoProps {
  infoData: StadiumReservationStateData;
  price: {
    rentalItemTotalPrice: number;
    totalPaymentPrice: number;
  };
}

const ReservationInfo = ({ infoData, price }: ReservationInfoProps) => {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const handleReserveInfoToggle = () => {
    setInfoOpen(prev => !prev);
  };
  const { items, pricePerHalfHour, reservingDate, reservingTimes, reservedTimes, headCount } = infoData;
  const { rentalItemTotalPrice, totalPaymentPrice } = price;
  console.log(reservingTimes);

  return (
    <ReservationInfoBlock>
      <TitleWrapper>
        <h2>예약 정보</h2>
        <AccordionToggleButton open={infoOpen} onAccordionToggle={handleReserveInfoToggle} />
      </TitleWrapper>
      <StyledSeparateLine />
      <ReservationInfoBody open={infoOpen}>
        <div>
          <dt>예약 날짜</dt>
          <dd>{reservingDate}</dd>
        </div>
        <div>
          <dt>예약 시간</dt>
          <dd>
            <span>{reservingTimes.length === 0 ? null : reservingTimes[0]}</span>외{' '}
            <span>{reservingTimes.length === 0 ? '0' : reservingTimes.length - 1}</span>개
          </dd>
        </div>
        <div>
          <dt>예약 인원</dt>
          <dd>{headCount}명</dd>
        </div>
        <StyledSeparateLine />
        <div>
          <dt>체육관 예약 금액</dt>
          <dd>{formatter.getIntlCurrencyKr(pricePerHalfHour * reservingTimes.length)}</dd>
        </div>
        <div>
          <dt>총 대여용품 금액</dt>
          <dd>{formatter.getIntlCurrencyKr(rentalItemTotalPrice * items.length)}</dd>
        </div>
      </ReservationInfoBody>
      <InfoBodyTotalPrice>
        <dt>최종 결제 금액</dt>
        <dd>{formatter.getIntlCurrencyKr(totalPaymentPrice)}</dd>
      </InfoBodyTotalPrice>
    </ReservationInfoBlock>
  );
};

export default ReservationInfo;

const ReservationInfoBlock = styled.div`
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

  div {
    display: flex;
    align-items: center;

    div {
      display: inline-block;
      margin-right: 8px;

      span {
        color: ${palette.primary['green']};
        font-size: ${typo.base};
        font-weight: 500;
      }
    }
  }
`;

const ReservationInfoBody = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
  }

  dt {
    font-weight: 500;
  }

  dd {
    span {
      margin-right: 2px;
      padding: 1px 8px;
      color: #fff;
      border-radius: 50%;
      background-color: ${palette.primary['green']};
    }

    span:first-of-type {
      color: ${palette.primary['green']};
      background-color: #fff;
      text-decoration: underline;
    }
  }
`;

const InfoBodyTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-top: 8px;
  padding: 6px;
  border: 1px solid ${palette.primary['green']};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-weight: 500;

  dt {
    color: ${palette.primary['green']};
  }
  dd {
    color: ${palette.primary['green']};
  }
`;
