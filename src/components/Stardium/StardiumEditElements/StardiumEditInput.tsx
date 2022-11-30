import Input from '@/components/common/atoms/Input';
import React from 'react';

type StardiumEditInputProps = {
  title: string;
  id: string;
  type: string;
  placeholder: string;
};

const StardiumEditInput = ({ title, id, type, placeholder }: StardiumEditInputProps) => {
  return (
    <div>
      <label htmlFor="stardiumName">{title}</label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
};

export default StardiumEditInput;
