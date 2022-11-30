import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import Input from '../common/atoms/Input';
import Responsive from '../common/Responsive';
import StardiumEidtImage from './StardiumEditElements/StardiumEidtImage';
import StardiumEditInput from './StardiumEditElements/StardiumEditInput';
import StardiumEditTag from './StardiumEditElements/StardiumEditTag';
import StardiumEditAddress from './StardiumEditElements/StardiumEditAddress';

interface StardiumEditProps {}

const StardiumEdit = (props: StardiumEditProps) => {
  return (
    <StardiumEditBlock>
      <StardiumEidtImage />
      <hr />
      <StardiumEditInputContainer>
        <StardiumEditInput type="text" id="stardiumName" title="체육관 이름" placeholder="체육관 이름" />
        <StardiumEditAddress />
        <StardiumEditInput type="text" id="stardiumPrice" title="체육관 가격" placeholder="체육관 가격" />
        <StardiumEditTag />
      </StardiumEditInputContainer>
    </StardiumEditBlock>
  );
};

const StardiumEditBlock = styled.div`
  padding-top: 2rem;

  ${Responsive.ResponsiveWrapper}
`;

const StardiumEditInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  div > label {
    display: block;
  }

  div > input + input {
    margin-top: 0.2rem;
  }
`;

export default StardiumEdit;
