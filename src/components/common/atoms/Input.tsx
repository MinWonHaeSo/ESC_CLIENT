import { AllCheckedState } from '@/components/SignUp/SignUpForm';
import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';
import React from 'react';

interface InputProps {
  type: string;
  value: string;
  id?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ type, placeholder, id, value, onChange, onKeyDown, required }: InputProps) => {
  return (
    <SInput
      type={type}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoCapitalize="false"
      required={required}
    />
  );
};

export default Input;

const SInput = styled.input`
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
