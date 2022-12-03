import React, { useRef, useState } from 'react';
import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

interface RentalItemLisProps {}

const RentalItemList = (props: RentalItemLisProps) => {
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickFileButton = () => {
    fileInputRef.current?.click();
  };

  return (
    <RentalItemListContainer>
      <div className="rental-list-content">
        <div>
          <button className="rental-item-image-add-btn" type="button" onClick={handleClickFileButton}>
            이미지 추가
          </button>
          <input type="file" accept="application/pdf, image/png" style={{ display: 'none' }} ref={fileInputRef} />
        </div>
        <div className="rental-item-input-container">
          <input type="text" placeholder="대여 용품 이름" />
          <input type="text" placeholder="대여 용품 가격" />
          <input type="text" placeholder="대여 용품 설명" />
        </div>
      </div>
      <button className="rental-item-remove-btn" type="button">
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
  }

  .rental-item-image-add-btn {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: ${palette.grey[400]};
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
export default RentalItemList;
