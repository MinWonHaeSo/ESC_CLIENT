import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stadiumApi, useRemoveStadiumMutation } from '@/api/stadiumApi';
import { clearPaging } from '@/store/pagingSlice';
import { RootState } from '@/store/store';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import media from '@/lib/styles/media';
import PATH from '@/constants/path';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import StadiumList from './StadiumList';
import sw from '@/lib/utils/customSweetAlert';

interface ManagerStadiumListProps {}

const ManagerStadiumList = (props: ManagerStadiumListProps) => {
  const [trigger] = stadiumApi.endpoints.getStadiumManagerList.useLazyQuery();
  const [stadiumRemoveAPI] = useRemoveStadiumMutation();
  const { content, isLast, nextPage, totalElements } = useSelector((state: RootState) => state.paging);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;

    trigger(page);
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  const handleDetailModalOpen = (id: string) => {
    navigate(PATH.STADIUM_RESERVATION_USER, {
      state: {
        id: '100',
      },
    });
  };

  const handleRemoveStadium = async (id: string) => {
    try {
      const response = await stadiumRemoveAPI(id);
    } catch {
      sw.toast.error('다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearPaging());
    };
  }, []);

  return (
    <Container>
      <TitleBlock>
        <Title fontSize={`${typo.xLarge}`} marginTop="20px">
          등록한 체육관
        </Title>
        <TotalCountBlock>
          <span>{totalElements} </span>개
        </TotalCountBlock>
      </TitleBlock>
      <StadiumBlock>
        {content.map(stadium => (
          <StadiumList
            key={stadium.stadiumId}
            stadium={stadium}
            onMoveDetail={handleDetailModalOpen}
            onRemove={handleRemoveStadium}
          />
        ))}
      </StadiumBlock>
      <div ref={$observerTarget}></div>
    </Container>
  );
};

const Container = styled.div`
  ${Responsive.ResponsiveWrapper}
`;

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const TotalCountBlock = styled.div`
  margin-right: 8px;
  font-weight: 600;
  span {
    font-size: ${typo.xLarge};
    color: ${palette.primary['green']};
  }
`;

const StadiumBlock = styled.div`
  display: grid;
  gap: 12px;
  ${media.xsmallMin} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.mediumMin} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }
`;

export default ManagerStadiumList;
