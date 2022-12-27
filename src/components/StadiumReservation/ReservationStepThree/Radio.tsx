import React from 'react';
import styled from '@emotion/styled';
import palette from '@/lib/styles/palette';

interface RadioProps {
  id: string;
  inputStatus: string;
  children: React.ReactNode;
}

const Radio = ({ id, inputStatus, children }: RadioProps) => {
  return (
    <>
      <SLabel htmlFor={id}>
        <SInput type="radio" id={id} name="payment" checked={inputStatus === id} onChange={() => {}} />
        {children}
      </SLabel>
    </>
  );
};

export default Radio;

const SLabel = styled.label`
  display: flex;
  align-items: center;
`;

const SInput = styled.input`
  margin-right: 0.6rem;
  width: 21px;
  height: 21px;
  border: max(2px, 0.1em) solid ${palette.grey[200]};
  border-radius: 50%;
  vertical-align: middle;
  appearance: none;

  &:checked {
    border: 0.4em solid ${palette.primary['green']};
  }
`;
