import { ReservationStatus } from '@/api/stadiumApi';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface StatusTagProps {
  status: ReservationStatus;
}

const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <Tag status={status}>{status === 'RESERVED' ? '예약중' : status === 'EXECUTED' ? '사용완료' : '예약취소'}</Tag>
  );
};

export default StatusTag;

const Tag = styled.div<{ status: ReservationStatus }>`
  position: absolute;
  top: 8px;
  right: 8px;
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

  ${media.xxlargeMin} {
    width: 80px;
    height: 36px;
    font-size: ${typo.base};
  }
`;
