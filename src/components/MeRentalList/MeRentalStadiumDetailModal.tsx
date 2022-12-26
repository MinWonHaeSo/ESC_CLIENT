import { useFinishStadiumUtilizationMutation } from '@/api/reservationApi';
import { ReservationStatus, useGetRentalStadiumDetailQuery } from '@/api/stadiumApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import sw from '@/lib/utils/customSweetAlert';
import formatter from '@/lib/utils/formatter';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import Loading from '../common/Loading/Loading';

interface MeRentalStadiumDetailModal {
  reservationId: number;
  stadiumId: number;
  closeModal: () => void;
  rentalStadiumListRefetch: () => void;
}

const MeRentalStadiumDetailModal = ({
  reservationId,
  stadiumId,
  closeModal,
  rentalStadiumListRefetch,
}: MeRentalStadiumDetailModal) => {
  const {
    data,
    isLoading,
    error,
    refetch: rentalStadiumDetailRefetch,
  } = useGetRentalStadiumDetailQuery({ reservationId, stadiumId }, { refetchOnMountOrArgChange: true });
  const [finishStadiumUtilizationAPI, { isLoading: finishLoading }] = useFinishStadiumUtilizationMutation();

  const handleCompleteUtilization = async () => {
    await finishStadiumUtilizationAPI({ reservationId, stadiumId });
    rentalStadiumDetailRefetch();
    rentalStadiumListRefetch();
    closeModal();
  };

  if (error) {
    sw.toast.error('정보를 받아올 수 없습니다.');
  }

  if (isLoading || !data || finishLoading) {
    return <Loading />;
  }

  const { name, status, member, reservingDate, reservingTime, headCount, price, paymentType, items } = data;

  return (
    <Block>
      <StadiumInfo>
        <InfoTitle>{name}</InfoTitle>
        <StatusTag status={status}>
          {status === 'RESERVED' ? '예약중' : status === 'EXECUTED' ? '사용완료' : '예약취소'}
        </StatusTag>
        <InfoBody>
          <dt>예약자</dt>
          <dd>{member.nickname}</dd>
        </InfoBody>
        <InfoBody>
          <dt>예약날짜</dt>
          <dd>{reservingDate}</dd>
        </InfoBody>
        <InfoBody>
          <dt>예약시간</dt>
          <dd>
            {reservingTime.map(time => (
              <span key={time}>{time}</span>
            ))}
          </dd>
        </InfoBody>
        <InfoBody>
          <dt>예약인원</dt>
          <dd>{headCount}명</dd>
        </InfoBody>
      </StadiumInfo>
      <ItemInfo>
        <SWrapper>
          <RentalTitle>대여용품</RentalTitle>
          <TotalItemCount>총 {items.length}개</TotalItemCount>
        </SWrapper>
        <RentalItem>
          <thead>
            <tr>
              <th>이 름</th>
              <th>개 수</th>
              <th>금 액</th>
              <th>총 액</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.count}EA</td>
                <td>{formatter.getIntlCurrencyKr(item.price)}원</td>
                <td>{formatter.getIntlCurrencyKr(item.price * item.count)}원</td>
              </tr>
            ))}
          </tbody>
        </RentalItem>
        <Payment>
          <PaymentTitle>결제</PaymentTitle>
          <PaymentInfo>
            <PaymentType>
              <dt>결제 방법</dt>
              <dd>{paymentType}</dd>
            </PaymentType>
            <Price status={status}>
              <dt>최종 결제 금액</dt>
              <dd>{formatter.getIntlCurrencyKr(price)}</dd>
            </Price>
          </PaymentInfo>
        </Payment>
      </ItemInfo>
      {status === 'RESERVED' && (
        <ButtonWrapper>
          <Button
            type={'button'}
            size={'large'}
            backgroundColor={`${palette.primary['green']}`}
            onClick={handleCompleteUtilization}
          >
            사용완료
          </Button>
        </ButtonWrapper>
      )}
    </Block>
  );
};

export default MeRentalStadiumDetailModal;

const Block = styled.div`
  height: 420px;
  overflow-y: scroll;
`;

const StadiumInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: 100%;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #fff;
`;

const InfoTitle = styled.h3`
  position: relative;
  margin-bottom: 12px;
  padding: 4px;
  width: 200px;
  font-size: ${typo.medium};
  text-align: start;
`;

const StatusTag = styled.span<{ status: ReservationStatus }>`
  position: absolute;
  top: 14px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  font-size: ${typo.micro};
  font-weight: 500;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: ${({ status }) =>
    status === 'RESERVED'
      ? `${palette.primary['green']}`
      : status === 'EXECUTED'
      ? `${palette.primary['orange']}`
      : `${palette.primary['red']}`};
`;

const InfoBody = styled.div`
  display: flex;
  align-items: center;
  font-size: ${typo.small};

  dt {
    width: 30%;
    font-weight: 500;
    text-align: start;
  }
  dd {
    width: 50%;
    margin-left: 50px;
    text-align: end;

    span {
      display: inline-block;
      margin-left: 4px;
      padding: 2px 4px;
      color: #fff;
      background-color: ${palette.black[200]};
      border-radius: 6px;
      opacity: 0.85;
    }
  }
`;

const ItemInfo = styled.div`
  margin-bottom: 1rem;
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-left: 6px;
  padding-right: 6px;
`;

const RentalTitle = styled.h3`
  width: 60px;
  height: 20px;
  font-size: ${typo.base};
  text-align: center;
`;

const TotalItemCount = styled.span`
  font-size: ${typo.small};
`;

const RentalItem = styled.table`
  margin-bottom: 12px;
  padding: 4px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #fff;
  font-size: ${typo.small};

  th {
    padding: 2px;
    border-bottom: 1px solid ${palette.grey[200]};
  }
  td {
    padding: 4px;
    border-bottom: 1px solid ${palette.grey[200]};
    text-align: center;
  }
`;

const Payment = styled.div``;

const PaymentTitle = styled.h3`
  margin-bottom: 8px;
  padding-left: 6px;
  padding-right: 6px;
  font-size: ${typo.base};
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-size: ${typo.small};

  dt {
    font-weight: 500;
  }
`;

const PaymentType = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.div<{ status: ReservationStatus }>`
  display: flex;
  justify-content: space-between;

  dt {
    color: ${({ status }) =>
      status === 'RESERVED'
        ? `${palette.primary['green']}`
        : status === 'EXECUTED'
        ? `${palette.primary['orange']}`
        : `${palette.primary['red']}`};
  }

  dd {
    font-weight: 500;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
