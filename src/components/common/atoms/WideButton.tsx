import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <SButton type="submit">{children}</SButton>;
};

export default Button;

const SButton = styled.button`
  margin-top: 16px;
  padding: 12px 16px;
  width: 280px;
  border-radius: 10px;
  font-size: ${typo.base};
  font-weight: 500;
  color: #fff;
  background-color: ${palette.black[100]};
  cursor: pointer;

  &:active {
    color: #fff;
    background-color: ${palette.black[200]};
  }
`;
