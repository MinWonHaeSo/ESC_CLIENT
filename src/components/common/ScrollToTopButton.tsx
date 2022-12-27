import palette from '@/lib/styles/palette';
import styled from '@emotion/styled';

const ScrollToTopButton = () => {
  return (
    <ScrollTopButton
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <i className="fa-solid fa-angle-up" />
    </ScrollTopButton>
  );
};

export default ScrollToTopButton;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 4.2rem;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${palette.black[100]};
  background-color: ${palette.grey[100]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 999;
`;
