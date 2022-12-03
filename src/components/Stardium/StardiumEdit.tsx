import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import Responsive from '../common/Responsive';
import StardiumEidtImage from './StardiumEditElements/StardiumEidtImage';
import StardiumEditInput from './StardiumEditElements/StardiumEditInput';
import StardiumEditTag from './StardiumEditElements/StardiumEditTag';
import StardiumEditAddress from './StardiumEditElements/StardiumEditAddress';

import { typo } from '@/lib/styles/typo';
import Label from '../common/atoms/Label';
import StardiumTime from './StardiumEditElements/StardiumTime';

interface StardiumEditProps {}

const StardiumEdit = (props: StardiumEditProps) => {
  const handleSumbitStardium = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StardiumEditBlock>
      <StardiumEidtImage />
      <hr />
      <StardiumEditForm onSubmit={handleSumbitStardium}>
        <StardiumEditInput type="text" id="stardiumName" title="체육관 이름" placeholder="체육관 이름" />
        <StardiumEditAddress />
        <StardiumEditInput type="text" id="stardiumPrice" title="체육관 가격" placeholder="체육관 가격" />
        <StardiumEditTag />
        <StardiumTime />
        <button type="submit">등록하기</button>
      </StardiumEditForm>
    </StardiumEditBlock>
  );
};

const StardiumEditBlock = styled.div`
  padding-top: 2rem;

  ${Responsive.ResponsiveWrapper}
`;

const StardiumEditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;

  div > label {
    display: block;
  }

  button[type='submit'] {
    width: 80%;
    height: 50px;
    border-radius: 10px;
    background-color: black;
    font-weight: bold;
    font-size: ${typo.medium};
    color: #fff;
  }
`;

export default StardiumEdit;
