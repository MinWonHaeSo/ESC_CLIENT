import Input, { InputProps } from './Input';

interface RequiredInput extends InputProps {
  required: boolean;
  disabled?: boolean;
}

const RequiredInput = ({ ...props }: RequiredInput) => {
  return <Input {...props} />;
};

export default RequiredInput;
