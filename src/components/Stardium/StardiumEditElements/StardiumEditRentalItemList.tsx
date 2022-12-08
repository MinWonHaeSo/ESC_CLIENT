import React, { useRef } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import { changeRentalItemImage, changeRentalItemName, rentalItemType } from '@/store/stardiumWriteSlice';
import { useDispatch } from 'react-redux';

interface RentalItemLisProps {
  rentalItem: rentalItemType;
  onRemoveRental: (id: string) => void;
}

const RentalItemList = ({ rentalItem, onRemoveRental }: RentalItemLisProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const handleClickFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleChangeRentalImage = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!e.target.files?.length) return

    const files = Array.from(e.target.files);
    const filesPath = files.map(file => URL.createObjectURL(file))[0];

    dispatch(changeRentalItemImage({ id, url: filesPath }));
  };

  const handleChangeRentalNameInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;

    dispatch(changeRentalItemName({ value, id }));
  }

  const handleChangeRentalPriceInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;

    dispatch(changeRentalItemName({ value, id }));
  }

  return (
    <RentalItemListContainer>
      <div className="rental-list-content">
        <div>
          {rentalItem.img ? (
            <img src={rentalItem.img} alt="" width="100px" height="100px" />
          ) : (
            <button className="rental-item-image-add-btn" type="button" onClick={handleClickFileButton}>
              이미지 추가
            </button>
          )}
          <input
            type="file"
            onChange={e => handleChangeRentalImage(e, rentalItem.id)}
            accept="application/pdf, image/png"
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>
        <div className="rental-item-input-container">
          <input
            type="text"
            value={rentalItem.name}
            onChange={e => handleChangeRentalNameInput(e, rentalItem.id)}
            name="name"
            placeholder="대여 용품 이름"
          />
          <input
            type="text"
            value={rentalItem.price}
            onChange={e => handleChangeRentalPriceInput(e, rentalItem.id)}
            name="price"
            placeholder="대여 용품 가격"
          />
        </div>
      </div>
      <button className="rental-item-remove-btn" type="button" onClick={() => onRemoveRental(rentalItem.id)}>
        삭제
      </button>
    </RentalItemListContainer>
  );
};

const RentalItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.grey[400]};

  .rental-list-content {
    display: flex;
    gap: 1rem;
  }

  .rental-item-remove-btn {
    width: 100px;
    margin-left: auto;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    background-color: ${palette.primary.point};
    color: #fff;
  }

  .rental-item-image-add-btn {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: ${palette.grey[200]};
  }

  .rental-item-input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input[type='text'] {
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    border: 1px solid ${palette.grey[400]};
  }

  input[type='file'] {
  }
`;
export default React.memo(RentalItemList);
