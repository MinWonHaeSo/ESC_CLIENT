import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ImagesType } from '@/api/stadiumApi';
import SliderCurrentInfo from './SliderCurrentInfo';
import SliderList from './SliderList';
import SliderBtn from './SliderBtn';

interface SlideProps {
  images: ImagesType[] | undefined;
}

const Slide = ({ images }: SlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images) {
    return null;
  }

  const handleSlidePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleSlideNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <SliderContainer>
      <SliderList slides={images} currentIndex={currentIndex} />
      <SliderCurrentInfo currentIndex={currentIndex + 1} imagesLength={images.length} />
      <SliderBtn direction="prev" onSlideMove={handleSlidePrev} />
      <SliderBtn direction="next" onSlideMove={handleSlideNext} />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  width: 100%;
  max-width: 340px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;

export default Slide;
