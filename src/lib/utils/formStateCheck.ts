import { AllCheckedState } from '@/components/SignUp/SignUpForm';
type Checked = Partial<AllCheckedState>;

const formStateCheck = (checked: Checked) => {
  return Object.values(checked).every(item => item === true);
};

export default formStateCheck;
