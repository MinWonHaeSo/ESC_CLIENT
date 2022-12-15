import React from 'react';
import styled from '@emotion/styled';
import { CSSProperties } from '@emotion/serialize';

interface SLiderBtnProps {
  direction: 'next' | 'prev';
  onSlideMove: () => void;
}

const SliderBtn = ({ direction, onSlideMove }: SLiderBtnProps) => {
  return (
    <SliderBtnContainer directionType={direction} onClick={onSlideMove}>
      {direction === 'next' ? (
        <i className="fa-solid fa-chevron-right"></i>
      ) : (
        <i className="fa-solid fa-chevron-left"></i>
      )}
    </SliderBtnContainer>
  );
};

const SliderBtnContainer = styled.button<CSSProperties & { directionType: 'next' | 'prev' }>`
  position: absolute;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  z-index: 10px;
  cursor: pointer;
  background-color: #fff;
  font-size: 12px;

  &:active {
    transform: scale(1.1);
  }

  ${({ directionType }) =>
    directionType === 'next'
      ? `
        top: 40%;
        right: 2%;
      `
      : `
      top: 40%;
      left: 2%;`}
`;

export default SliderBtn;
