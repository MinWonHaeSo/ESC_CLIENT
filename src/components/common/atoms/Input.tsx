import palette from '@/lib/styles/palette';
import { typo } from '@/lib/styles/typo';
import styled from '@emotion/styled';

interface InputProps {
  type: string;
  placeholder: string;
  id?: string;
}

const Input = ({ type, placeholder, id }: InputProps) => {
  return <SInput type={type} id={id} placeholder={placeholder} autoCapitalize="false" />;
};

export default Input;

const SInput = styled.input`
  width: 280px;
  padding: 12px 16px;
  border: 1px solid ${palette.grey[300]};
  border-radius: 10px;
  font-size: ${typo.base};

  &::placeholder {
    color: ${palette.grey[400]};
  }

  &:focus {
    border: 1px solid ${palette.black[200]};
    background-color: ${palette.grey[100]};
  }
`;
