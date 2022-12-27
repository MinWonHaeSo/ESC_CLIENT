import React, { createContext, useState } from 'react';
import Portal from '@/Portal/Portal';
import Modal from '@/components/Modal/Index';

interface modalContextValue {
  isModalOpened: boolean;
  openModal: (value: React.ReactNode) => void;
  closeModal: () => void;
}

export const modalContext = createContext<modalContextValue | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<React.ReactNode>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = (value: React.ReactNode) => {
    setContent(value);
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <modalContext.Provider value={{ isModalOpened, openModal, closeModal }}>
      {children}
      <Portal>
        <Modal openModal={isModalOpened} setOpenModal={setIsModalOpened}>
          {content}
        </Modal>
      </Portal>
    </modalContext.Provider>
  );
};

export default ModalProvider;
