import React, { useCallback } from 'react';
import Label from '@/components/common/atoms/Label';
import RentalItemList from '@/components/Stardium/StardiumEditElements/StardiumEditRentalItemList';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { addRentalItem, removeRentalItem, rentalItemType } from '@/store/stardiumWriteSlice';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

interface StardiumEditRentalItemProps {
  rentalItems : rentalItemType[]
}

const StardiumEditRentalItem = ({ rentalItems }: StardiumEditRentalItemProps) => {
  const dispatch = useDispatch();

  const handleAddkRentalContentLength = useCallback(() => {
    dispatch(addRentalItem({
      id: uuidv4(),
      img: '',
      name: '',
      price: 0
    }));
  },[dispatch]);

  const handleRemoveRental = useCallback((id: string) => {
    dispatch(removeRentalItem(id));
  }, [dispatch]);

  return (
    <StardiumRentalItemContainer>
      <Label htmlFor="" required={false}>
        대여 용품
      </Label>
      <span>최대 10개 까지 등록 가능합니다.</span>
      <button className="rental-item-add-btn" type="button" onClick={handleAddkRentalContentLength}>
        대여 용품 추가
      </button>
      <RentalItemContent>
        {rentalItems.map((item, idx) => (
          <RentalItemList
            key={idx}
            rentalItem={item}
            onRemoveRental={handleRemoveRental}
          />
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

export default React.memo(StardiumEditRentalItem);
