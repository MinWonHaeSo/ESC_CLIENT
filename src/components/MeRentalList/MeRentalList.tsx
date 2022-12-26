import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import ScrollToTopButton from '../common/ScrollToTopButton';
import StyledPadding from '../common/StyledPadding';
import MeRentalStadium from './MeRentalStadium';

interface MeRentalListProps {}

const MeRentalList = ({}: MeRentalListProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [sort, setSort] = useState<'up' | 'down'>('up');

  const handleSortFilterClick = () => {
    setShow(prev => !prev);
  };

  const handleSortClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { title } = e.currentTarget;
    if (title === 'up') {
      setSort('up');
    } else {
      setSort('down');
    }
    setShow(prev => !prev);
  };

  return (
    <>
      <MeRentalListBlock>
        <TitleWrapper>
          <Title fontSize={`${typo.xxLarge}`} marginTop={'20px'}>
            예약 내역
          </Title>
          <SortFilter onClick={handleSortFilterClick}>
            <i className="fa-solid fa-filter" />
            정렬
          </SortFilter>
        </TitleWrapper>
        <MeRentalStadium sort={sort} />
        <StyledPadding />

        <SortUl show={show}>
          <li title={'up'} onClick={handleSortClick}>
            <i className="fa-solid fa-arrow-up" />
            오름차순
          </li>
          <li title={'down'} onClick={handleSortClick}>
            <i className="fa-solid fa-arrow-down" />
            내림차순
          </li>
        </SortUl>
        <DimmedBackground
          show={show}
          onClick={() => {
            setShow(prev => !prev);
          }}
        />
        <ScrollToTopButton />
      </MeRentalListBlock>
    </>
  );
};

export default MeRentalList;

const MeRentalListBlock = styled.section`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SortFilter = styled.label`
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 4px 12px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${palette.grey[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:hover {
    background-color: ${palette.grey[200]};
  }

  i {
    margin-right: 6px;
    font-size: 12px;
  }
`;

const SortUl = styled.ul<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  left: 0;
  bottom: 0px;
  width: 100%;
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px 10px 0 0;
  font-size: ${typo.small};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  background-color: ${palette.grey[100]};
  overflow: hidden;
  white-space: nowrap;
  transform: ${({ show }) => (show ? `translateY(0)` : `translateY(60px)`)};
  transition: all 0.3s ease-in-out;
  z-index: 100;

  li {
    padding: 10px 0;
    font-weight: 600;
    border-bottom: 1px solid ${palette.grey[200]};
    text-align: center;
    i {
      margin-right: 8px;
    }
  }

  li:hover,
  li:focus {
    background-color: ${palette.grey[200]};
  }
`;

const DimmedBackground = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 90px;
  width: 100%;
  height: 100vh;
  background-color: ${palette.grey[500]};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: visibility 0.2s ease-in-out;
  opacity: 0.4;
`;
