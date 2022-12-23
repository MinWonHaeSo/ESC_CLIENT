import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import formatter from '@/lib/utils/formatter';
import { StadiumReservationStateData } from '@/store/stadiumReservationSlice';
import styled from '@emotion/styled';
import AccordionToggleButton from './ToggleButton';
import StyledSeparateLine from './StyledSerparateLine';

interface ReservationInfoProps {
  infoOpen: boolean;
  onReserveInfoToggle: () => void;
  infoData: StadiumReservationStateData;
}

const ReservationInfo = ({ infoOpen, onReserveInfoToggle, infoData }: ReservationInfoProps) => {
  const { items, pricePerHalfHour, reservingDate, reservedTimes, headCount } = infoData;

  const rentalItemTotalPrice = items.reduce((acc, curr) => {
    acc += curr.price;
    return acc;
  }, 0);

  const totalPrice = pricePerHalfHour * 1 + rentalItemTotalPrice;

  return (
    <ReservationInfoBlock>
      <TitleWrapper>
        <h2>예약 정보</h2>
        <AccordionToggleButton open={infoOpen} onAccordionToggle={onReserveInfoToggle} />
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
            {reservedTimes[0]}외 {reservedTimes.length}개
          </dd>
        </div>
        <div>
          <dt>예약 인원</dt>
          <dd>{headCount}명</dd>
        </div>
        <StyledSeparateLine />
        <div>
          <dt>체육관 예약 금액</dt>
          <dd>{formatter.getIntlCurrencyKr(pricePerHalfHour)}</dd>
        </div>
        <div>
          <dt>대여용품 총 금액</dt>
          <dd>{formatter.getIntlCurrencyKr(rentalItemTotalPrice)}</dd>
        </div>
      </ReservationInfoBody>
      <InfoBodyTotalPrice>
        <dt>최종 결제 금액</dt>
        <dd>{formatter.getIntlCurrencyKr(totalPrice)}</dd>
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
  }

  dt {
    font-weight: 500;
  }
`;

const InfoBodyTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-top: 8px;
  padding: 4px;
  border: 1px solid ${palette.primary['green']};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-weight: 500;

  dd {
    color: ${palette.primary['green']};
  }
`;
