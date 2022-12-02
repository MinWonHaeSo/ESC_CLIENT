import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React from 'react';

export interface InputProps {
  type: string;
  value?: string;
  id?: string;
  placeholder: string;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

const Input = ({ type, value, id, placeholder, minLength, onChange, onKeyDown }: InputProps) => {
  return (
    <SInput
      type={type}
      value={value}
      id={id}
      placeholder={placeholder}
      minLength={minLength}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoCapitalize="false"
    />
  );
};

export default Input;

const SInput = styled.input`
  display: block;
  width: 280px;
  padding: 12px 16px;
  border: ${({ required }) => (required ? `1px solid ${palette.primary.red}` : `1px solid ${palette.grey[300]}`)};
  border-radius: 10px;
  font-size: ${typo.base};
  color: ${palette.black[200]};

  &::placeholder {
    color: ${palette.grey[400]};
  }

  &:focus {
    border: ${({ required }) => (required ? `1px solid ${palette.primary.red}` : `1px solid ${palette.black[200]}`)};
    background-color: ${palette.grey[100]};
  }
`;
