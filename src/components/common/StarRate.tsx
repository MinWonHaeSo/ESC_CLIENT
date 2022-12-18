import palette from '@/lib/styles/palette';
import React from 'react';

interface StarRateProps {
  starRating: number;
}

const StarRate = ({ starRating }: StarRateProps) => {
  return (
    <>
      {Array.from({ length: 5 }).map((star, idx) =>
        starRating >= idx + 1 ? (
          <i className="fa-solid fa-star" style={{ color: palette.primary.orange }} key={idx}></i>
        ) : (
          <i className="fa-regular fa-star" style={{ color: palette.primary.orange }} key={idx}></i>
        ),
      )}
    </>
  );
};

export default StarRate;
