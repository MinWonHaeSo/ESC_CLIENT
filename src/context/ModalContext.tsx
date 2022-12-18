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
