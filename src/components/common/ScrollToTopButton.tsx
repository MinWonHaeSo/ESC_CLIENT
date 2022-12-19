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
  border: 1px solid black;
  z-index: 999;
`;
