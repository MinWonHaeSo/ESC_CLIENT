import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { modalContext } from '@/context/ModalContext';
import palette from '@/lib/styles/palette';
import media from '@/lib/styles/media';
import { RentalStadiumType } from '@/types/stadiumType';
import Button from '../common/atoms/Button';
import CardStadium from '../CardStadium/Index';
import MeRentalStadiumDetailModal from './MeRentalStadiumDetailModal';

interface MeRentalStadiumItemProps {
  item: RentalStadiumType;
  onCancelClick: (reservationId: string, stadiumId: string) => void;
}

const MeRentalStadiumItem = ({ item, onCancelClick }: MeRentalStadiumItemProps) => {
  const openModal = useContext(modalContext)?.openModal;
  const closeModal = useContext(modalContext)?.closeModal;
  const location = useLocation();

  const handleShowDetailClick = async (reservationId: string, stadiumId: string) => {
    openModal?.(
      <MeRentalStadiumDetailModal reservationId={reservationId} stadiumId={stadiumId} closeModal={closeModal!} />,
    );
  };

  return (
    <MeRentalStadiumBlock key={item.reservationId}>
      <CardStadium stadium={item} currentLocation={location.pathname} />
      <ButtonWrapper>
        <Button
          type={'button'}
          size={'small'}
          backgroundColor={`${palette.black[100]}`}
          onClick={() => handleShowDetailClick(item.reservationId!, item.stadiumId)}
        >
          상세보기
        </Button>
        {item.status === 'RESERVED' ? (
          <Button
            type={'button'}
            size={'small'}
            backgroundColor={`${palette.primary.red}`}
            onClick={() => onCancelClick(item.reservationId!, item.stadiumId)}
          >
            예약취소
          </Button>
        ) : null}
      </ButtonWrapper>
    </MeRentalStadiumBlock>
  );
};

const MeRentalStadiumBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.8rem;
  border-radius: 10px;

  ${media.mediumMin} {
    gap: 1rem;
    padding: 8px;
  }

  ${media.xxlargeMin} {
    gap: 1.5rem;
    padding: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export default MeRentalStadiumItem;
