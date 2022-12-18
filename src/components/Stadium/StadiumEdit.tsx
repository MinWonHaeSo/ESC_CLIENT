import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { stadiumWriteState } from '@/store/stadiumWriteSlice';
import Responsive from '../common/Responsive';
import EditImage from './EditElements/EditImage';
import EditInput from './EditElements/EditInput';
import EditTag from './EditElements/EditTag';
import Address from './EditElements/EditAddress';
import EditTime from './EditElements/EditTime';
import EditRentalItem from './EditElements/EditRentalItem';
import Dividers from '../common/Dividers';
import { useAddStadiumMutation, useUpdateStadiumInfoMutation } from '@/api/stadiumApi';
import OriginFilesContext, { contextFileType } from '@/context/OriginFilesContext';
import Button from '../common/atoms/Button';
import palette from '@/lib/styles/palette';
import { fileUpload } from '@/api/fileUpload';
import sw from '@/lib/utils/customSweetAlert';
import Loading from '../common/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import PATH from '@/constants/path';

interface StadiumEditProps {
  write: stadiumWriteState;
}

const StadiumEdit = ({ write }: StadiumEditProps) => {
  const [addStadiumAPI] = useAddStadiumMutation();
  const [updateStadiumAPI] = useUpdateStadiumInfoMutation();
  const [isLoading, setIsLoading] = useState(false); // Cloudinary API Loading
  const value = useContext(OriginFilesContext);
  const navigate = useNavigate();

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

  const handleSumbitStadium = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const form = { ...write };

      // 클라우디너리 서버 이미지 저장
      const uploadStadium = await fileUpload(value?.state.stadiums, 'stadium');
      const uploadRental = await fileUpload(value?.state.rental, 'rental');

      // 반환 받은 데이터 url, public_id 추출
      const resStadiumImage = uploadStadium.map(image => ({
        publicId: image.data.public_id,
        imgUrl: image.data.url,
      }));
      const resRentalImage = uploadRental.map(image => ({ url: image.data.url, public_id: image.data.public_id }));

      // form rentalItems 데이터 변경
      const rentalItems = form.rentalItems.map((rental, idx) => ({
        ...rental,
        publicId: resRentalImage[idx].public_id,
        id: resRentalImage[idx].public_id,
        imgUrl: resRentalImage[idx].url,
      }));

      let response;
      let redirectId;

      if (write.id) {
        // 수정 API
        response = await updateStadiumAPI({
          stadium: { ...form, imgs: resStadiumImage, rentalItems },
          id: write.id,
        }).unwrap();
        redirectId = response.id;
      } else {
        // 추가 API
        response = await addStadiumAPI({ ...form, imgs: resStadiumImage, rentalItems }).unwrap();
        redirectId = response.data.id;
      }

      sw.toast.success('성공적으로 저장 되었습니다.');
      setIsLoading(false);

      navigate(`/${PATH.STADIUM_DETAIL}/${redirectId}`);
    } catch (e) {
      setIsLoading(false);
      sw.toast.error('다시 시도해 주세요.');
    }
  };

  return (
    <StadiumEditContainer>
      {isLoading ? <Loading /> : null}
      <StadiumEditForm onSubmit={handleSumbitStadium}>
        <EditImage
          images={write.imgs}
          onAddImages={handleAddStadiumImages}
          onRemoveImages={hanldeRemoveStadiumImages}
        />
        <Dividers />
        <EditInput
          type="text"
          name="name"
          id="stadiumName"
          title="체육관 이름"
          placeholder="체육관 이름"
          value={write.name}
        />
        <Address address={write.address} detailAddress={write.detailAddress} />
        <EditInput
          type="text"
          name="phone"
          id="phone"
          title="체육관 전화번호"
          placeholder="'-' 를 제외하고 적어주세요."
          maxLength={11}
          value={write.phone}
        />
        <EditInput
          type="number"
          name="holidayPricePerHalfHour"
          id="holidayPricePerHalfHour"
          title="주말 체육관 가격"
          placeholder="금액을 입력해 주세요."
          value={write.holidayPricePerHalfHour}
        />
        <EditInput
          type="number"
          name="weekdayPricePerHalfHour"
          id="weekdayPricePerHalfHour"
          title="평일 체육관 가격"
          placeholder="금액을 입력해 주세요."
          value={write.weekdayPricePerHalfHour}
        />
        <EditTag tags={write.tags} />
        <EditTime startTime={write.openTime} endTime={write.closeTime} />
        <EditRentalItem
          rentalItems={write.rentalItems}
          onAddImages={handleAddRentalImages}
          onRemoveImages={handleRemoveRentalImages}
        />
        <Button size="large" backgroundColor={palette.black[100]} type="submit">
          {write.id ? '수정하기' : '등록하기'}
        </Button>
      </StadiumEditForm>
    </StadiumEditContainer>
  );
};

const StadiumEditContainer = styled.div`
  position: relative;
  padding: 2rem 0;

  ${Responsive.ResponsiveWrapper}
`;

const StadiumEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  div > label {
    display: block;
  }
`;

export default StadiumEdit;
