import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { changeFiled } from '@/store/stadiumWriteSlice';
import Input from '@/components/common/atoms/Input';
import Label from '@/components/common/atoms/Label';
import FormInputDivisionBlock from '@/components/common/Responsive/FormInputDivisionBlock';

interface EditInputProps {
  value: string | number;
  name: string;
  title: string;
  id: string;
  type: string;
  placeholder: string;
}

const EditInput = ({ value, name, title, id, type, placeholder }: EditInputProps) => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeFiled({ name, value }));
  };

  return (
    <EditInputWrapper>
      <Label htmlFor={id} required={false}>
        * {title}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={true}
        value={value}
        onChange={handleChange}
      />
    </EditInputWrapper>
  );
};

const EditInputWrapper = styled.div`
  ${FormInputDivisionBlock};
`;

export default React.memo(EditInput);
