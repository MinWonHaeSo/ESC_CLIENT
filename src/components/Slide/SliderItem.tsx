import styled from '@emotion/styled';
import React from 'react';

interface SliderItemtProps {
  img: string;
  currentSlide: boolean;
}

const SliderItem = ({ img, currentSlide }: SliderItemtProps) => {
  return (
    <SliderItemContainer style={currentSlide ? { opacity: '1' } : {}}>
      <img src={img} alt="체육관 이미지" width="340px" height="150px" />
    </SliderItemContainer>
  );
};

const SliderItemContainer = styled.div`
  width: 100%;
  max-width: 340px;
  height: 150px;
  position: absolute;
  opacity: 0;
  transition: opacity ease-in-out 0.4s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default SliderItem;
