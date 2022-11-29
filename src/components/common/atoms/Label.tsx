import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { Children } from 'react';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

const Label = ({ children, htmlFor }: LabelProps) => {
  return <SLabel htmlFor={htmlFor}>{children}</SLabel>;
};

export default Label;

const SLabel = styled.label`
  font-size: ${typo.base};
  font-weight: 400;
  line-height: ${typo.medium};
  color: ${palette.black[200]};
  word-break: keep-all;
`;
