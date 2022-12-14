import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAddStadiumMutation, useGetStadiumDetailQuery, useUpdateStadiumInfoMutation } from '@/api/stadiumApi';
import { fileUpload } from '@/api/fileUpload';
import { stadiumWriteState } from '@/store/stadiumWriteSlice';
import OriginFilesContext, { contextFileType } from '@/context/OriginFilesContext';
import PATH from '@/constants/path';
import sw from '@/lib/utils/customSweetAlert';
import palette from '@/lib/styles/palette';
import Responsive from '../common/Responsive';
import Dividers from '../common/Dividers';
import Loading from '../common/Loading/Loading';
import Button from '../common/atoms/Button';
import EditRentalItem from './EditElements/EditRentalItem';
import EditInput from './EditElements/EditInput';
import EditImage from './EditElements/EditImage';
import EditTime from './EditElements/EditTime';
import EditTag from './EditElements/EditTag';
import Address from './EditElements/EditAddress';

interface StadiumEditProps {
  write: stadiumWriteState;
}

const CLOUDINARY_URL = 'http://res.cloudinary.com/dsbjcdw4r/image/upload/';

const StadiumEdit = ({ write }: StadiumEditProps) => {
  const [addStadiumAPI] = useAddStadiumMutation();
  const [updateStadiumAPI] = useUpdateStadiumInfoMutation();
  const { refetch } = useGetStadiumDetailQuery(String(write.id));
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

      // ?????????????????? ?????? ????????? ??????
      const uploadStadium = await fileUpload(value?.state.stadiums, 'stadium');
      const uploadRental = await fileUpload(value?.state.rental, 'rental');

      // ?????? ?????? ????????? url, public_id ??????
      const resStadiumImage = uploadStadium.map(image => ({
        publicId: image.data.public_id,
        imgUrl: image.data.url.slice(0, 49) + 'f_auto,q_auto/' + image.data.url.slice(49),
      }));

      const resRentalImage = uploadRental.map(image => ({
        url: image.data.url.slice(0, 49) + 'f_auto,q_auto/' + image.data.url.slice(49),
        public_id: image.data.public_id,
      }));

      // form stadiumImages ????????? ??????
      const stadiumImages = form.imgs.map((img, idx) => ({
        publicId: resStadiumImage[idx]?.publicId ?? img.publicId,
        imgUrl: resStadiumImage[idx]?.imgUrl ?? img.imgUrl,
      }));

      // form rentalItems ????????? ??????
      const rentalItems = form.rentalItems.map((rental, idx) => ({
        ...rental,
        publicId: resRentalImage[idx]?.public_id ?? rental.publicId,
        imgUrl: resRentalImage[idx]?.url ?? rental.imgUrl,
      }));

      let response;
      let redirectId;

      if (write.id) {
        // ?????? API
        response = await updateStadiumAPI({
          stadium: { ...form, imgs: stadiumImages, rentalItems },
          id: write.id,
        }).unwrap();
        redirectId = response.id;
      } else {
        // ?????? API
        response = await addStadiumAPI({ ...form, imgs: stadiumImages, rentalItems }).unwrap();
        redirectId = response.stadium.id;
      }

      refetch();
      sw.toast.success('??????????????? ?????? ???????????????.');
      setIsLoading(false);

      navigate(`${PATH.STADIUM_DETAIL}/${redirectId}`);
    } catch (e) {
      setIsLoading(false);
      sw.toast.error('?????? ????????? ?????????.');
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
          title="????????? ??????"
          placeholder="????????? ??????"
          value={write.name}
        />
        <Address address={write.address} detailAddress={write.detailAddress} />
        <EditInput
          type="text"
          name="phone"
          id="phone"
          title="????????? ????????????"
          placeholder="'-' ??? ???????????? ???????????????."
          maxLength={11}
          value={write.phone}
        />
        <EditInput
          type="number"
          name="holidayPricePerHalfHour"
          id="holidayPricePerHalfHour"
          title="?????? ????????? ??????"
          placeholder="????????? ????????? ?????????."
          value={write.holidayPricePerHalfHour}
        />
        <EditInput
          type="number"
          name="weekdayPricePerHalfHour"
          id="weekdayPricePerHalfHour"
          title="?????? ????????? ??????"
          placeholder="????????? ????????? ?????????."
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
          {write.id ? '????????????' : '????????????'}
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
