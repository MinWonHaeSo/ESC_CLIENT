import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import { Children } from 'react';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  required: boolean;
}

const Label = ({ children, htmlFor, required }: LabelProps) => {
  return (
    <SLabel htmlFor={htmlFor} required={required}>
      {children}
    </SLabel>
  );
};

export default Label;

const SLabel = styled.label<{ required: boolean }>`
  font-size: ${typo.base};
  font-weight: 400;
  line-height: ${typo.medium};
  color: ${({ required }) => (required ? `${palette.primary.red}` : `${palette.black[200]}`)};
  word-break: keep-all;
`;
