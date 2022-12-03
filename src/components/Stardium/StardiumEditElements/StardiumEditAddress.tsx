import React, { useState } from 'react';
import Input from '@/components/common/atoms/Input';
import DaumPostcode from 'react-daum-postcode';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import FormInputDivisionBlock from '@/components/common/Responsive/FormInputDivisionBlock';
import Label from '@/components/common/atoms/Label';

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
    <>
      <StardiumEditAddressContainer>
        <Label htmlFor="stardiumAddress" required={false}>
          * 체육관 주소
        </Label>
        <Input type="text" id="stardiumAddress" placeholder="체육관 주소" required={true} />
        <Input type="text" id="stardiumSubAddress" placeholder="체육관 상세 주소" />
        <button type="button" className="address-search-btn" onClick={handleClickPopupToggle}>
          주소 검색
        </button>
      </StardiumEditAddressContainer>
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

const StardiumEditAddressContainer = styled.div`
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

export default StardiumEditAddress;
