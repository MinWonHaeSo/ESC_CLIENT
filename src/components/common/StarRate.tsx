import palette from '@/lib/styles/palette';
import React from 'react';

interface StarRateProps {
  starRating: number;
}

const StarRate = ({ starRating }: StarRateProps) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <i
          className={`${starRating >= idx + 1 ? 'fa-solid' : 'fa-regular'} fa-star`}
          style={{ color: palette.primary.orange }}
          key={idx}
        ></i>
      ))}
    </>
  );
};

export default StarRate;
