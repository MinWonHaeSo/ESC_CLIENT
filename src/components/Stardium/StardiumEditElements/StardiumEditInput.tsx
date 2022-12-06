import Input from '@/components/common/atoms/Input';
import Label from '@/components/common/atoms/Label';
import FormInputDivisionBlock from '@/components/common/Responsive/FormInputDivisionBlock';
import { changeFiled } from '@/store/stardiumWriteSlice';
import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface StardiumEditInputProps {
  value: string | number;
  name: string
  title: string;
  id: string;
  type: string;
  placeholder: string;
};

const StardiumEditInput = ({ value, name, title, id, type, placeholder }: StardiumEditInputProps) => {
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(changeFiled({ name, value }));
    },
    [dispatch],
  );

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

export default React.memo(StardiumEditInput);
