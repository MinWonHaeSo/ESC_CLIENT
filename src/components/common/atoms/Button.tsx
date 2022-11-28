import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  children: React.ReactNode;
  type: ButtonType;
  size: SizeList;
  onClick: () => void;
}

type SizeList = 'large' | 'medium' | 'small';

const sizeStyle = {
  large: `
    padding: 12px 16px;
    width: 280px;
    font-size: ${typo.base};
  `,
  medium: `
    width: 100px;
    height: 40px;
    font-size: ${typo.base};
  `,
  small: `
    width: 60px;
    height: 30px;
    font-size: ${typo.micro};
  `,
};

const Button = ({ children, type, size, onClick }: ButtonProps) => {
  return (
    <SButton type={type} size={size} onClick={onClick}>
      {children}
    </SButton>
  );
};

export default Button;

const SButton = styled.button<CSSProperties & { size: SizeList }>`
  border-radius: 10px;
  font-weight: 500;
  color: #fff;
  background-color: ${palette.black[100]};
  cursor: pointer;

  &:active {
    color: #fff;
    background-color: ${palette.black[200]};
  }

  ${({ size }) => size && sizeStyle[size]}
`;
