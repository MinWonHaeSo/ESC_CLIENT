import React from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import Tag from '../Tag/Tag';
import { stadiumWriteState } from '@/store/stadiumWriteSlice';

interface InfoProps {
  info: stadiumWriteState;
}

const Info = ({ info }: InfoProps) => {
  return (
    <DetailInfoBlock>
      <div className="info-item-wrapper">
        <div className="title">주 소</div>
        <div className="info">{info.address}</div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">상세주소</div>
        <div className="info">{info.detailAddress}</div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">주말가격</div>
        <div className="info">
          {new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' }).format(
            Number(info.holidayPricePerHalfHour),
          )}
        </div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">평일가격</div>
        <div className="info">
          {new Intl.NumberFormat('ko', { style: 'currency', currency: 'KRW' }).format(
            Number(info.weekdayPricePerHalfHour),
          )}
        </div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">운영시간</div>
        <div className="info">
          {info.openTime} ~ {info.closeTime}
        </div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">연락처</div>
        <div className="info">{info.phone}</div>
      </div>
    </DetailInfoBlock>
  );
};

const DetailInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem 1rem;
  background-color: ${palette.grey[100]};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .info-item-wrapper {
    display: flex;
    font-size: 12px;
    line-height: 21px;
    align-items: center;
  }

  .title {
    width: 6rem;
    height: 100%;
    padding: 6px 8px;
    border: 1px solid ${palette.grey[300]};
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
  }

  .info {
    width: 100%;
    margin-left: 1rem;
    align-self: center;
    font-weight: bold;
  }
`;

export default Info;
