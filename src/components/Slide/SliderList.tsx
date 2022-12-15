import styled from '@emotion/styled';
import SliderItem from './SliderItem';

type slideType = {};

interface SliderListProps {
  slides: string[];
  currentIndex: number;
}

const SliderList = ({ slides, currentIndex }: SliderListProps) => {
  return (
    <SliderListContainer>
      {slides.map((slide, idx) => (
        <SliderItem key={idx} img={slide} currentSlide={currentIndex === idx} />
      ))}
    </SliderListContainer>
  );
};

const SliderListContainer = styled.div``;

export default SliderList;
