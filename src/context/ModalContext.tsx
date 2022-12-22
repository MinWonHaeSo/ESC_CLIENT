import React, { createContext, useState } from 'react';
import Portal from '@/Portal/Portal';
import Modal from '@/components/Modal/Modal';

interface modalContextValue {
  isModalOpened: boolean;
  openModal: (value: React.ReactNode) => void;
  closeModal: () => void;
}

const modalContext = createContext<modalContextValue | null>(null);

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
export { modalContext };
=======
import { useMemo, useState } from 'react';
import { createContext } from 'react';

interface ModalDispatchContext {
  open: () => void;
  close: () => void;
}

export const ModalDispatchContext = createContext<ModalDispatchContext>({
  open: () => {},
  close: () => {},
});

export const ModalStateContext = createContext<boolean | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const open = () => {
    setOpenModal(true);
  };

  const close = () => {
    setOpenModal(false);
  };

  const dispatch = useMemo(() => ({ open, close }), []);
  return (
    <ModalStateContext.Provider value={openModal}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};
