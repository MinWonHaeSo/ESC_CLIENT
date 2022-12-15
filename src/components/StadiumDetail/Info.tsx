import React from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import Tag from '../Tag/Tag';

interface InfoProps {}

const Info = (props: InfoProps) => {
  return (
    <DetailInfoBlock>
      <div className="info-item-wrapper">
        <div className="title">주 소</div>
        <div className="info">서울시 강남구 논현동 123길</div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">가 격</div>
        <div className="info">10,000원</div>
      </div>
      <div className="info-item-wrapper">
        <div className="title">운영시간</div>
        <div className="info">오전 09시 ~ 오후 10시</div>
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
