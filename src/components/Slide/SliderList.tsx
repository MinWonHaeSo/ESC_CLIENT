import { ImagesType } from '@/api/stadiumApi';
import styled from '@emotion/styled';
import SliderItem from './SliderItem';

type slideType = {};

interface SliderListProps {
  slides: ImagesType[];
  currentIndex: number;
}

const SliderList = ({ slides, currentIndex }: SliderListProps) => {
  return (
    <SliderListContainer>
      {slides.map((slide, idx) => (
        <SliderItem key={idx} img={slide.imgUrl} currentSlide={currentIndex === idx} />
      ))}
    </SliderListContainer>
  );
};

const SliderListContainer = styled.div``;

export default SliderList;
