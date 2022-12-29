import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';
import { RentalStadiumType } from '@/types/stadiumType';
import CardStadium from '../CardStadium/Index';

interface StadiumListProps {
  stadium: RentalStadiumType;
  onMoveDetail: (id: string) => void;
  onRemove: (id: string) => void;
}

const StadiumList = ({ stadium, onMoveDetail, onRemove }: StadiumListProps) => {
  return (
    <Container key={stadium.stadiumId}>
      <CardStadium stadium={stadium} currentLocation={location.pathname} />
      <ManagerButtonWrapper>
        <button className="btn btn-detail" onClick={() => onMoveDetail(stadium.stadiumId)}>
          <span>상세정보</span>
        </button>
        <button className="btn btn-remove" onClick={() => onRemove(stadium.stadiumId)}>
          <span>삭제하기</span>
        </button>
      </ManagerButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ManagerButtonWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;

  .btn {
    width: 80px;
    padding: 0.3rem 0.5rem;
    border-radius: 10px;
  }

  .btn-detail {
    background-color: #000;
    color: #fff;
  }

  .btn-remove {
    background-color: ${palette.primary.point};
    color: #fff;
  }
`;

export default StadiumList;
