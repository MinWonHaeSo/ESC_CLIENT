import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';
import Button from '../common/atoms/Button';
import media from '@/lib/styles/media';
import { typo } from '@/lib/styles/typo';
import Modal from '@/Portals/Modal';
import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from '@/context/ModalContext';

interface MeRentalInfoProps {
  stadiumInfo: {
    tags: Array<string>;
    date: string;
    time: string;
    people: number;
    items: number;
  };
}

const MeRentalInfo = ({ stadiumInfo }: MeRentalInfoProps) => {
  const { tags, date, time, people, items } = stadiumInfo;

  const modalState = useContext(ModalStateContext);
  const modalDispatch = useContext(ModalDispatchContext);
  const { open: openModal, close: closeModal } = modalDispatch;

  const handleShowDetailClick = () => {
    if (modalState) {
      closeModal();
    } else {
      openModal();
    }
  };

  return (
    <>
      <RentalInfoBlock>
        <StadiumTagList>
          {tags.map(tag => (
            <StadiumTag key={tag}>{tag}</StadiumTag>
          ))}
        </StadiumTagList>
        <RentalDetail>
          <DetailWrapper>
            <Title>예약날짜</Title>
            <Desc>{date}</Desc>
          </DetailWrapper>
          <DetailWrapper>
            <Title>예약시간</Title>
            <Desc>{time}</Desc>
          </DetailWrapper>
          <DetailWrapper>
            <Title>예약인원</Title>
            <Desc>
              <span>{people} </span>명
            </Desc>
          </DetailWrapper>
          <DetailWrapper>
            <Title>대여용품</Title>
            <Desc>
              총<span> &nbsp;{items}</span>개
            </Desc>
          </DetailWrapper>
        </RentalDetail>
        <ButtonWrapper>
          <Button
            type={'button'}
            size={'small'}
            backgroundColor={`${palette.black[100]}`}
            onClick={handleShowDetailClick}
          >
            상세보기
          </Button>
          <Button type={'button'} size={'small'} backgroundColor={`${palette.primary.red}`} onClick={() => {}}>
            예약취소
          </Button>
        </ButtonWrapper>
      </RentalInfoBlock>
      <Modal id={'ME_Rental_List_Modal'} isOpen={modalState} onClose={closeModal} />
    </>
  );
};

export default MeRentalInfo;

const RentalInfoBlock = styled.div`
  position: relative;
  width: 50%;
`;

const StadiumTagList = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 16px;
`;

const StadiumTag = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  font-size: ${typo.micro};
  font-weight: 600;
  color: ${palette.black[100]};
  border-bottom: 2px solid ${palette.black[200]};

  ${media.xxlargeMin} {
    width: 80px;
    height: 36px;
    font-size: ${typo.base};
  }
`;

const RentalDetail = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${media.xxlargeMin} {
    gap: 16px;
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${typo.small};

  ${media.xxlargeMin} {
    font-size: ${typo.base};
  }
`;

const Title = styled.dt`
  font-weight: 500;
`;
const Desc = styled.dd`
  color: ${palette.grey[500]};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
