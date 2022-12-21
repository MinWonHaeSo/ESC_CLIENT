import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { useState } from 'react';

const Footer = () => {
  const [show, setShow] = useState<boolean>(false);
  const developers = ['dongjjji', 'SoaLee', 'phc09188', 'younjaewon', 'olhkyle'];
  return (
    <FooterBlock>
      <FooterTitle>ESC Sports Club</FooterTitle>
      <Sponsor>
        <label>Sponsored</label>
        <span>
          <a href={'https://zero-base.co.kr/'}>ZEROBASE</a>
        </span>
      </Sponsor>
      <Copyright show={show}>
        <label>Copyright ©</label>
        <span onClick={() => setShow(!show)}>Team MinWonHaeSo</span>
        <i className="fa-solid fa-caret-down" />
      </Copyright>
      {show ? (
        <Developers>
          {developers.map(developer => (
            <li key={developer}>{developer}</li>
          ))}
        </Developers>
      ) : null}
    </FooterBlock>
  );
};

export default Footer;

const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 1.5rem;
  color: ${palette.grey[200]};
  background-color: ${palette.black[100]};
`;

const FooterTitle = styled.h1`
  font-size: ${typo.medium};
`;

const Sponsor = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 0.4rem;
  font-size: ${typo.small};
  font-weight: 500;
`;

const Copyright = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: ${typo.small};
  label {
    margin-right: 8px;
  }
  span {
    position: relative;
    margin-right: 5px;
    border-radius: 24px;
    font-weight: 600;
  }

  span::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${palette.grey[100]};
  }

  i {
    transition: transform 0.2s ease-in;
    ${({ show }) => show && `transform: rotate(180deg)`}
  }
`;

const Developers = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: ${typo.micro};
`;
