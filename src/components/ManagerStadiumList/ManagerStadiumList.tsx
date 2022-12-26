import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { stadiumApi } from '@/api/stadiumApi';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { modalContext } from '@/context/ModalContext';
import CardStadium from '../CardStadium/CardStadium';
import Title from '../common/atoms/Title';
import Responsive from '../common/Responsive';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearPaging } from '@/store/pagingSlice';
import PATH from '@/constants/path';
import StadiumInfoModal from './StadiumInfoModal';

interface ManagerStadiumListProps {}

const ManagerStadiumList = (props: ManagerStadiumListProps) => {
  const [trigger] = stadiumApi.endpoints.getStadiumManagerList.useLazyQuery();
  const { content, isLast, nextPage } = useSelector((state: RootState) => state.paging);
  const openModal = useContext(modalContext)?.openModal;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchNextPage = () => {
    if (isLast) return;
    const page = nextPage ? nextPage : 0;

    trigger(page);
  };

  const $observerTarget = useInfinityScroll(fetchNextPage);

  const handleDetailModalOpen = (id: number) => {
    navigate(PATH.STADIUM_RESERVATION_USER);
  };

  const handleRemoveStadium = (id: number) => {
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
        <TotalCountBlock>
          <span>{content.length} </span>개
        </TotalCountBlock>
      </TitleWrapper>
      {content.map(stadium => (
        <CardStadiumWrapper key={stadium.stadiumId}>
          <CardStadium stadium={stadium} currentLocation={location.pathname} />
        <CardStadiumWrapper>
          <ManagerButtonContainer>
            <button className="btn btn-detail" onClick={() => handleDetailModalOpen(stadium.stadiumId)}>
              <span>상세정보</span>
            </button>
            <button className="btn btn-remove" onClick={() => handleRemoveStadium(stadium.stadiumId)}>
              <span>삭제하기</span>
            </button>
          </ManagerButtonContainer>
        </CardStadiumWrapper>
      ))}
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

const TotalCountBlock = styled.div`
  margin-right: 8px;
  font-weight: 600;
  span {
    font-size: ${typo.xLarge};
    color: ${palette.primary['green']};
  }
`;

const CardStadiumWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ManagerButtonContainer = styled.div`
  display: flex;
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

export default ManagerStadiumList;