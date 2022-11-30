import React, { useState } from 'react';
import Input from '@/components/common/atoms/Input';
import DaumPostcode from 'react-daum-postcode';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';

type Props = {};

const StardiumEditAddress = (props: Props) => {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [stardiumAdress, setStardiumAdress] = useState('');

  const handleClickPopupToggle = () => {
    setOpenPostcode(current => !current);
  };

  const handleSelectAdress = (data: any) => {
    setStardiumAdress(data.address);
    console.log(`주소: ${data.address}, 우편번호: ${data.zonecode}`);
    setOpenPostcode(false);
  };
  return (
    <StardiumEditAddressContainer>
      <label htmlFor="stardiumAddress">체육관 주소</label>
      <Input type="text" id="stardiumAddress" placeholder="체육관 주소" />
      <Input type="text" id="stardiumSubAddress" placeholder="체육관 상세 주소" />
      <button className="address-search-btn" onClick={handleClickPopupToggle}>
        주소 검색
      </button>
      {openPostcode && (
        <div className="postmodal">
          <button className="close-popup-btn" onClick={handleClickPopupToggle}>
            닫기
          </button>
          <DaumPostcode
            onComplete={handleSelectAdress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          />
        </div>
      )}
    </StardiumEditAddressContainer>
  );
};

const StardiumEditAddressContainer = styled.div`
  .postmodal {
    display: block;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid ${palette.grey[500]};
  }
  .address-search-btn {
    width: 280px;
    height: 50px;
    margin-top: 0.5rem;
    border-radius: 10px;
    background-color: ${palette.primary.green};
    color: #fff;
  }

  .close-popup-btn {
    display: block;
    margin-left: auto;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    background-color: ${palette.grey[400]};
    padding: 0.2rem;
  }
`;

export default StardiumEditAddress;
