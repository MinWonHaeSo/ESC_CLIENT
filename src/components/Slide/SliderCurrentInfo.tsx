import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';

type SliderCurrentInfoProps = {
  currentIndex: number;
  imagesLength: number;
};

const SliderCurrentInfo = ({ currentIndex, imagesLength }: SliderCurrentInfoProps) => {
  return (
    <SliderCurrentInfoContainer>
      {currentIndex}/{imagesLength}
    </SliderCurrentInfoContainer>
  );
};

const SliderCurrentInfoContainer = styled.span`
  position: absolute;

  width: 50px;
  right: 10px;
  bottom: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.76);
  letter-spacing: 2px;
  text-align: center;
  color: ${palette.grey[500]};
`;

export default SliderCurrentInfo;
