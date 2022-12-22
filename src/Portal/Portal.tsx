import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(children, el);
};

export default Portal;
