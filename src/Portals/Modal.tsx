import Title from '@/components/common/atoms/Title';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import Portal from './Portal';

interface Modal {
  id: string;
  isOpen: boolean | null;
  onClose: () => void;
}

const Modal = ({ id, isOpen, onClose }: Modal) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isOpen]);

  return (
    <Portal id={id}>
      <ModalBlock isOpen={isOpen}>
        <BackgroundLayout onClick={() => onClose()}>
          <ModalContainer>
            <TitleWrapper>
              <Title fontSize={`${typo.large}`}>예약 상세 정보</Title>
              <CloseButton onClick={onClose}>
                <i className="fa-solid fa-xmark" />
              </CloseButton>
            </TitleWrapper>
            <BodyWrapper>
              <StadiumInfo>
                <InfoTitle>{'강남체육관'}</InfoTitle>
                <StatusTag>예약중</StatusTag>
                <InfoBody>
                  <dt>예약자</dt>
                  <dd>홍길동</dd>
                </InfoBody>
                <InfoBody>
                  <dt>결제날짜</dt>
                  <dd>2022.12.25</dd>
                </InfoBody>
                <InfoBody>
                  <dt>예약날짜</dt>
                  <dd>2022.12.25</dd>
                </InfoBody>
                <InfoBody>
                  <dt>예약시간</dt>
                  <dd>15:00 - 17:00</dd>
                </InfoBody>
              </StadiumInfo>
              <RentalTitle>대여용품</RentalTitle>
              <RentalItem>
                <thead>
                  <tr>
                    <th>이 름</th>
                    <th>개 수</th>
                    <th>금 액</th>
                    <th>총 액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>테니스라켓</td>
                    <td>2EA</td>
                    <td>50,000원</td>
                    <td>100,000원</td>
                  </tr>
                </tbody>
              </RentalItem>
            </BodyWrapper>
          </ModalContainer>
        </BackgroundLayout>
      </ModalBlock>
    </Portal>
  );
};

export default Modal;

const ModalBlock = styled.div<{ isOpen: boolean | null }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  transition: display 0.5s ease-out;
`;

const BackgroundLayout = styled.div`
  z-index: 999; /* 의문이 들었던 부분 */
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalContainer = styled.div`
  padding: 20px;
  width: 342px;
  border-radius: 10px;
  box-shadow: rgba(29, 34, 53, 0.08) 0 3px 6px 0;
  background-color: #fafafa;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid ${palette.grey[200]};
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StadiumInfo = styled.div`
  position: relative;
  padding: 8px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #fff;
`;

const InfoTitle = styled.h3`
  position: relative;
  margin-bottom: 12px;
  padding: 4px;
  font-size: ${typo.medium};
  text-align: start;
`;

const StatusTag = styled.span`
  position: absolute;
  top: 14px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  font-size: ${typo.micro};
  font-weight: 500;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: ${palette.primary['green']};
`;

const InfoBody = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding-left: 6px;
  font-size: ${typo.small};
  dt {
    width: 30%;
    font-weight: 500;
    text-align: start;
  }
  dd {
    width: 50%;
    margin-left: 50px;
    text-align: end;
  }
`;

const RentalTitle = styled.h3`
  margin-left: 8px;
  width: 60px;
  height: 20px;
  font-size: ${typo.base};
  text-align: center;
`;

const RentalItem = styled.table`
  padding: 4px;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #fff;
  font-size: ${typo.small};

  th {
    padding: 2px;
    border-bottom: 1px solid ${palette.grey[200]};
  }
  td {
    padding: 4px;
    border-bottom: 1px solid ${palette.grey[200]};
  }
`;
