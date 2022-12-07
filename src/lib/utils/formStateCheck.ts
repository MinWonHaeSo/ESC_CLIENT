import { InitialRequiredState } from '@/components/Login/LoginForm';
import { AllCheckedState } from '@/components/SignUp/SignUpForm';
type Checked = AllCheckedState | InitialRequiredState;

const formStateCheck = (checked: Checked) => {
  return Object.values(checked).every(item => item === true);
};

export default formStateCheck;
