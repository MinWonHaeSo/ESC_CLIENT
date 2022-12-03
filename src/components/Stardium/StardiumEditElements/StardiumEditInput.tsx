import Input from '@/components/common/atoms/Input';
import Label from '@/components/common/atoms/Label';
import FormInputDivisionBlock from '@/components/common/Responsive/FormInputDivisionBlock';
import styled from '@emotion/styled';
import React from 'react';

type StardiumEditInputProps = {
  title: string;
  id: string;
  type: string;
  placeholder: string;
};

const StardiumEditInput = ({ title, id, type, placeholder }: StardiumEditInputProps) => {
  return (
    <EditInputWrapper>
      <Label htmlFor={id} required={false}>
        * {title}
      </Label>
      <Input type={type} id={id} placeholder={placeholder} required={true} />
    </EditInputWrapper>
  );
};

const EditInputWrapper = styled.div`
  ${FormInputDivisionBlock};
`;

export default StardiumEditInput;
