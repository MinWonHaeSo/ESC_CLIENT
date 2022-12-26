import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { stadiumApi, useGetStadiumManagerListQuery } from '@/api/stadiumApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import CardStadium from '../CardStadium/CardStadium';
import { clearPaging } from '@/store/pagingSlice';
import { useLocation } from 'react-router-dom';

interface ManagerStadiumListProps {}

const ManagerStadiumList = (props: ManagerStadiumListProps) => {
  const [trigger, { isLoading }] = stadiumApi.endpoints.getStadiumManagerList.useLazyQuery();
  const { content, isLast, nextPage } = useSelector((state: RootState) => state.paging);
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;

    trigger(page);
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  const handleDetailModalOpen = () => {
    // modal open
  };

  const handleRemoveStadium = () => {
    // remove staidum API
  };

  useEffect(() => {
    return () => {
      dispatch(clearPaging());
    };
  }, []);

  return (
    <ManagerStadiumListContainer>
      <TitleWrapper>
        <Title fontSize={`${typo.xLarge}`} marginTop="20px">
          등록한 체육관
        </Title>
        <TotalNotification>
          <span>{content.length} </span>개
        </TotalNotification>
      </TitleWrapper>
      <CardStadiumWrapper>
        {content.map(stadium => (
          <CardStadium key={stadium.name} stadium={stadium} currentLocation={location.pathname} />
        ))}
        <ManagerButtonContainer>
          <button className="btn btn-detail" onClick={handleDetailModalOpen}>
            <span>상세정보</span>
          </button>
          <button className="btn btn-remove" onClick={handleRemoveStadium}>
            <span>삭제하기</span>
          </button>
        </ManagerButtonContainer>
      </CardStadiumWrapper>
      <div ref={$observerTarget}></div>
    </ManagerStadiumListContainer>
  );
};

const ManagerStadiumListContainer = styled.div`
  ${Responsive.ResponsiveWrapper}
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const TotalNotification = styled.div`
  margin-right: 8px;
  font-weight: 600;
  span {
    font-size: ${typo.xLarge};
    color: ${palette.primary['green']};
  }
`;

const CardStadiumWrapper = styled.div`
  display: flex;
`;

const ManagerButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  .btn {
    position: absolute;
    width: 80px;
    padding: 0.3rem 0.5rem;
    border-radius: 10px;
  }

  .btn-detail {
    bottom: 3.5rem;
    right: 0;
    background-color: #000;
    color: #fff;
  }

  .btn-remove {
    bottom: 1rem;
    right: 0;
    background-color: ${palette.primary.point};
    color: #fff;
  }
`;

export default ManagerStadiumList;
