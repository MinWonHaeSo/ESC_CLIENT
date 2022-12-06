import Input from '@/components/common/atoms/Input';
import Label from '@/components/common/atoms/Label';
import RentalItemList from '@/components/common/RentalItemList';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';

interface StardiumRentalItemProps {}

const StardiumRentalItem = (props: StardiumRentalItemProps) => {
  const [contentLength, setContentLength] = useState<number>(1);

  const handleAddkRentalContentLength = () => {
    setContentLength(prev => prev + 1);
  };

  const handleRemoveRentalContent = (id: number) => {};

  return (
    <StardiumRentalItemContainer>
      <Label htmlFor="" required={false}>
        대여 용품
      </Label>
      <span>최대 10개 까지 추가 가능합니다.</span>
      <button className="rental-item-add-btn" type="button" onClick={handleAddkRentalContentLength}>
        대여 용품 추가
      </button>
      <RentalItemContent>
        {Array.from({ length: contentLength })
          .fill(0)
          .map((item, idx) => (
            <RentalItemList key={idx} />
          ))}
      </RentalItemContent>
    </StardiumRentalItemContainer>
  );
};

const StardiumRentalItemContainer = styled.div`
  display: flex;
  width: 280px;
  flex-direction: column;

  & > span {
    font-size: ${typo.micro};
    color: ${palette.grey[400]};
  }

  .rental-item-add-btn {
    width: 280px;
    height: 50px;
    margin-top: 0.5rem;
    border-radius: 10px;
    background-color: #13bd7e;
    color: #fff;
  }
`;

const RentalItemContent = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin-top: 1rem;
`;

export default StardiumRentalItem;
