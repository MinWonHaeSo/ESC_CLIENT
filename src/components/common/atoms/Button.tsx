import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import { CSSProperties } from '@emotion/serialize';
import styled from '@emotion/styled';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  children: React.ReactNode;
  type: ButtonType;
  size: SizeList;
  color?: string;
  backgroundColor: string;
  onClick?: () => void;
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

const Button = ({ children, type, size, color, backgroundColor, onClick }: ButtonProps) => {
  return (
    <SButton type={type} size={size} color={color} backgroundColor={backgroundColor} onClick={onClick}>
      {children}
    </SButton>
  );
};

export default Button;

const SButton = styled.button<CSSProperties & { size: SizeList }>`
  border-radius: 10px;
  font-weight: 500;
  color: ${props => (props.color ? props.color : '#fff')};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;

  &:active {
    opacity: 0.85;
  }

  ${({ size }) => size && sizeStyle[size]}
`;
