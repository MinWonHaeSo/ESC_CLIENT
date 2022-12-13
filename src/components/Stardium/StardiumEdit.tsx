import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { stardiumWriteState } from '@/store/stardiumWriteSlice';
import Responsive from '../common/Responsive';
import StardiumEditImage from './StardiumEditElements/StardiumEditImage';
import StardiumEditInput from './StardiumEditElements/StardiumEditInput';
import StardiumEditTag from './StardiumEditElements/StardiumEditTag';
import StardiumEditAddress from './StardiumEditElements/StardiumEditAddress';
import StardiumTime from './StardiumEditElements/StardiumTime';
import StardiumEditRentalItem from './StardiumEditElements/StardiumEditRentalItem';
import Dividers from '../common/Dividers';
import { useAddStadiumMutation } from '@/api/stardiumApi';
import OriginFilesContext, { contextFileType } from '@/context/OriginFilesContext';
import Button from '../common/atoms/Button';
import palette from '@/lib/styles/palette';
import { fileUpload } from '@/api/fileUpload';

interface StardiumEditProps {
  write: stardiumWriteState;
}

const StardiumEdit = ({ write }: StardiumEditProps) => {
  const [addStadiumAPI] = useAddStadiumMutation();
  const value = useContext(OriginFilesContext);

  const handleAddStadiumImages = (files: contextFileType[]) => {
    value?.actions.addStadiumImages(files);
  };

  const hanldeRemoveStadiumImages = (id: string) => {
    value?.actions.removeStadiumImages(id);
  };

  const handleAddRentalImages = (files: contextFileType, id: string) => {
    value?.actions.addRentalImages(files, id);
  };

  const handleRemoveRentalImages = (id: string) => {
    value?.actions.removeRentalImages(id);
  };

  const handleSumbitStardium = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = { ...write };

      // 클라우디너리 서버 이미지 저장
      const uploadStadium = await fileUpload(value?.state.stadiums, 'stadium');
      const uploadRental = await fileUpload(value?.state.rental, 'rental');

      // 반환 받은 데이터 url, public_id 추출
      const resStadiumImage = uploadStadium.map(image => ({
        url: image.data.url,
        id: image.data.public_id,
        public_id: image.data.public_id,
      }));
      const resRentalImage = uploadRental.map(image => ({ url: image.data.url, public_id: image.data.public_id }));

      // form rentalItems 데이터 변경
      const rentalItems = form.rentalItems.map((rental, idx) => ({
        ...rental,
        public_id: resRentalImage[idx].public_id,
        id: resRentalImage[idx].public_id,
        url: resRentalImage[idx].url,
      }));

      const response = await addStadiumAPI({ ...form, images: resStadiumImage, rentalItems });
    } catch (e) {
      console.error('e');
    }
  };

  return (
    <StardiumEditBlock>
      <StardiumEditForm onSubmit={handleSumbitStardium}>
        <StardiumEditImage
          images={write.images}
          onAddImages={handleAddStadiumImages}
          onRemoveImages={hanldeRemoveStadiumImages}
        />
        <Dividers />
        <StardiumEditInput
          type="text"
          name="name"
          id="stardiumName"
          title="체육관 이름"
          placeholder="체육관 이름"
          value={write.name}
        />
        <StardiumEditAddress address={write.address} detailAddress={write.detailAddress} />
        <StardiumEditInput
          type="number"
          name="holidayPricePerHalfHour"
          id="holidayPricePerHalfHour"
          title="주말 체육관 가격"
          placeholder="금액을 입력해 주세요."
          value={write.holidayPricePerHalfHour}
        />
        <StardiumEditInput
          type="number"
          name="weekdayPricePerHalfHour"
          id="weekdayPricePerHalfHour"
          title="평일 체육관 가격"
          placeholder="금액을 입력해 주세요."
          value={write.weekdayPricePerHalfHour}
        />
        <StardiumEditTag tags={write.tags} />
        <StardiumTime startTime={write.openTime} endTime={write.closeTime} />
        <StardiumEditRentalItem
          rentalItems={write.rentalItems}
          onAddImages={handleAddRentalImages}
          onRemoveImages={handleRemoveRentalImages}
        />
        <Button size="large" backgroundColor={palette.black[100]} type="submit">
          등록하기
        </Button>
      </StardiumEditForm>
    </StardiumEditBlock>
  );
};

const StardiumEditBlock = styled.div`
  padding: 2rem 0;

  hr {
    width: 100%;
    border-top: 1px solid #bbb;
  }

  ${Responsive.ResponsiveWrapper}
`;

const StardiumEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  div > label {
    display: block;
  }
`;

export default StardiumEdit;
