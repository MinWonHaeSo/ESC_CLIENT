import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Portal from '@/Portal/Portal';
import { typo } from '@/lib/styles/typo';
import palette from '@/lib/styles/palette';
import Title from '../common/atoms/Title';

interface Props {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, openModal, setOpenModal }: Props) => {
  const handleCloseButton: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.currentTarget === e.target) {
      setOpenModal(false);
    }
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  // 스크롤 방지
  useEffect(() => {
    if (openModal) {
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
  }, [openModal]);

  return (
    <Portal>
      {openModal && (
        <ModalContainer onClick={handleCloseButton}>
          <Content>
            <Header>
              <Title fontSize={`${typo.large}`}>예약 상세 정보</Title>
              <CloseButton type="button" onClick={modalClose}>
                <i className="fa-solid fa-xmark" />
              </CloseButton>
            </Header>
            {children}
          </Content>
        </ModalContainer>
      )}
    </Portal>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0px;
  max-width: 100%;
  min-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: 'visible';
  z-index: 999;
`;

const Content = styled.div`
  position: absolute;
  top: 15%;
  right: 50%;
  max-width: 100%;
  width: 342px;
  min-width: 40%;
  min-height: 40vh;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 10px;
  transform: translate(50%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  background-color: #fafafa;
  border-radius: 10px 10px 0 0;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid ${palette.grey[200]};
  background-color: #fafafa;
  cursor: pointer;

  i {
    font-size: ${typo.base};
  }
`;
