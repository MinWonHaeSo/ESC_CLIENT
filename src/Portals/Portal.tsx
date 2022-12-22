import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const modalElement = document.getElementById('modal');

  return ReactDOM.createPortal(children, modalElement as HTMLElement);
};

export default Portal;
