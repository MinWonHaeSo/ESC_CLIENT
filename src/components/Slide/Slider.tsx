import styled from '@emotion/styled';
import React, { useState } from 'react';
import SliderBtn from './SliderBtn';
import SliderCurrentInfo from './SliderCurrentInfo';
import SliderList from './SliderList';

const data = [
  'http://via.placeholder.com/340x150',
  'http://via.placeholder.com/340x160',
  'http://via.placeholder.com/340x170',
];

interface SliderProps {}

const Slider = (props: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlidePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleSlideNext = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <SliderContainer>
      <SliderList slides={data} currentIndex={currentIndex} />
      <SliderCurrentInfo currentIndex={currentIndex + 1} imagesLength={data.length} />
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

export default Slider;
