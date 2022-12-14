import React, { useState } from 'react';
import styled from '@emotion/styled';
import DaumPostcode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { changeAddress, changeFiled } from '@/store/stadiumWriteSlice';
import kakaoService from '@/service/kakaoMapService';
import palette from '@/lib/styles/palette';
import FormInputDivisionBlock from '@/components/common/Responsive/FormInputDivisionBlock';
import Input from '@/components/common/atoms/Input';
import Label from '@/components/common/atoms/Label';

interface EditAddressProps {
  address: string;
  detailAddress: string;
}

type GeoLocationType = {
  lat: string;
  lnt: string;
};

const EditAddress = ({ address, detailAddress }: EditAddressProps) => {
  const [openPostcode, setOpenPostcode] = useState(false);
  const dispatch = useDispatch();

  const handleSelectAdress = async (data: any) => {
    // 주소 string -> 위도 경도 변환
    const geoLocation = (await kakaoService.getGeoCode(data.address)) as GeoLocationType;

    dispatch(changeAddress({ address: data.address, lat: geoLocation.lat, lnt: geoLocation.lnt }));
    setOpenPostcode(false);
  };

  const handleChangeDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeFiled({ name, value }));
  };

  const handleClickPopupToggle = () => {
    setOpenPostcode(current => !current);
  };

  return (
    <>
      <EditAddressContainer>
        <Label htmlFor="stadiumDetailAddress" required={false}>
          * 체육관 주소
        </Label>
        <AddressContainer>
          {address ? (
            <span>{address}</span>
          ) : (
            <span style={{ color: `${palette.grey[400]}` }}>주소 검색을 눌러 주세요.</span>
          )}
        </AddressContainer>
        <Input
          type="text"
          value={detailAddress}
          name="detailAddress"
          id="stadiumDetailAddress"
          placeholder="체육관 상세 주소"
          onChange={handleChangeDetailAddress}
        />
        <button type="button" className="address-search-btn" onClick={handleClickPopupToggle}>
          주소 검색
        </button>
      </EditAddressContainer>
      <PopupAddressBlock>
        {openPostcode && (
          <div className="postmodal">
            <button type="button" className="close-popup-btn" onClick={handleClickPopupToggle}>
              닫기
            </button>
            <DaumPostcode
              onComplete={handleSelectAdress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            />
          </div>
        )}
      </PopupAddressBlock>
    </>
  );
};

const EditAddressContainer = styled.div`
  ${FormInputDivisionBlock};

  .address-search-btn {
    width: 280px;
    height: 50px;
    margin-top: 0.5rem;
    border-radius: 10px;
    background-color: ${palette.primary.green};
    color: #fff;
  }
`;

const AddressContainer = styled.div`
  width: 280px;
  padding: 0.8rem 1rem;

  border-radius: 10px;
  border: 1px solid ${palette.grey[300]};
`;

const PopupAddressBlock = styled.div`
  .postmodal {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid ${palette.grey[500]};
  }

  .close-popup-btn {
    display: block;
    margin-left: auto;
    margin-bottom: 0.5rem;
    padding: 0.2rem;
    border-radius: 5px;
    background-color: ${palette.grey[400]};
    color: #fff;
  }
`;

export default React.memo(EditAddress);
