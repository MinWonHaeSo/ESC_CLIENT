import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface TitleProps {
  children: React.ReactNode;
  fontSize: string;
}

const Title = ({ children, fontSize }: TitleProps) => {
  return <STitle fontSize={fontSize}>{children}</STitle>;
};

export default Title;

const STitle = styled.h1<{ fontSize: string }>`
  margin-top: 20px;
  margin-left: 20px;
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`}
`;
