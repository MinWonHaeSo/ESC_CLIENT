import styled from '@emotion/styled';

interface TitleProps {
  children: React.ReactNode;
  fontSize: string;
  marginLeft?: string;
  marginTop?: string;
}

const Title = ({ children, fontSize, marginLeft, marginTop }: TitleProps) => {
  return (
    <STitle fontSize={fontSize} left={marginLeft} top={marginTop}>
      {children}
    </STitle>
  );
};

export default Title;

type STitleProps = {
  fontSize: string;
  left: string | undefined;
  top: string | undefined;
};

const STitle = styled.h1<STitleProps>`
  ${({ top }) => top && `margin-top: ${top}`};
  ${({ left }) => left && `margin-left: ${left}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
`;
