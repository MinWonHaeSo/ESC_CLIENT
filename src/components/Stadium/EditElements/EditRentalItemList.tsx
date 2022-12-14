import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { changeRentalItemImage, changeRentalItemInput, rentalItemType } from '@/store/stadiumWriteSlice';
import { contextFileType } from '@/context/OriginFilesContext';
import fileObjectToIdUrlFile from '@/lib/utils/fileObjectToIdUrlFile';
import palette from '@/lib/styles/palette';

interface EditRentalItemLisProps {
  rentalItem: rentalItemType;
  onRemoveRental: (id: string) => void;
  onAddImages: (files: contextFileType, id: string) => void;
}

const EditRentalItemList = ({ rentalItem, onRemoveRental, onAddImages }: EditRentalItemLisProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const handleClickFileButton = () => {
    fileInputRef.current?.click();
  };

  const handleChangeRentalImage = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!e.target.files?.length) return;

    const { fileInfoArray, fileInfoExcludeFile } = fileObjectToIdUrlFile(e.target.files);

    onAddImages(fileInfoArray[0], id);
    dispatch(changeRentalItemImage({ id, imgUrl: fileInfoExcludeFile[0].imgUrl }));
  };

  const handleChangeRentalInputFiled = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.value as string;
    const name = e.target.name as 'name' | 'price';

    dispatch(changeRentalItemInput({ name, value, id }));
  };

  return (
    <RentalItemListContainer>
      <div className="rental-list-content">
        <div>
          {rentalItem.imgUrl ? (
            <img src={rentalItem.imgUrl} alt="" width="100px" height="100px" />
          ) : (
            <button className="rental-item-image-add-btn" type="button" onClick={handleClickFileButton}>
              이미지 추가
            </button>
          )}
          <input
            type="file"
            onChange={e => handleChangeRentalImage(e, rentalItem.publicId)}
            accept=".gif, .jpg, .png"
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>
        <div className="rental-item-input-container">
          <input
            type="text"
            value={rentalItem.name}
            onChange={e => handleChangeRentalInputFiled(e, rentalItem.publicId)}
            name="name"
            placeholder="대여 용품 이름"
          />
          <input
            type="number"
            value={rentalItem.price}
            onChange={e => handleChangeRentalInputFiled(e, rentalItem.publicId)}
            name="price"
            placeholder="대여 용품 가격"
          />
        </div>
      </div>
      <button className="rental-item-remove-btn" type="button" onClick={() => onRemoveRental(rentalItem.publicId)}>
        삭제
      </button>
    </RentalItemListContainer>
  );
};

const RentalItemListContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border: 1px solid ${palette.grey[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .rental-list-content {
    display: flex;
    gap: 1rem;

    img {
      border: 1px solid ${palette.grey[100]};
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
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

    input {
      width: 100%;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      border: 1px solid ${palette.grey[400]};
    }
  }
`;
export default React.memo(EditRentalItemList);
