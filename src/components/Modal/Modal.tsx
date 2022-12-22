import React from 'react';
import Portal from '@/Portal/Portal';
import styled from '@emotion/styled';

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

  return (
    <Portal>
      {openModal && (
        <ModalContainer onClick={handleCloseButton}>
          <Content>
            <Header>
              <img src="" alt="" width="50px" height="50px" />
              <CloseButton type="button" onClick={modalClose}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  tabIndex={1}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </CloseButton>
            </Header>
            {children}
          </Content>
        </ModalContainer>
      )}
    </Portal>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  inset: 0px;
  max-width: 100%;
  min-width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: 'visible';
`;
const Content = styled.div`
  max-width: 100%;
  min-width: 40%;
  min-height: 40vh;
  border-radius: 1rem;
  top: 20%;
  right: 50%;
  position: absolute;
  background-color: #ffffff;
  transform: translate(50%);
`;

const Header = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  display: flex;
  border: none;
  background-color: #f8f9fa;
  font-size: 1.5rem;
  color: #868e96;
  cursor: pointer;
`;

export default Modal;
