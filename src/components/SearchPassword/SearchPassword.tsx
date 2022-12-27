import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import StepComponentProcess from '../common/StepComponentProcess';
import EnterValidateCode from './EnterValidateCode';
import EnterNewPassWord from './EnterNewPassWord';
import ValidateEmail from './ValidateEmail';

interface FindPassWordProps {}

const SearchPassword = (props: FindPassWordProps) => {
  const orderIndex = useSelector((state: RootState) => state.searchPassword.index);
  const orderList = [
    { index: 1, component: <ValidateEmail /> },
    { index: 2, component: <EnterValidateCode /> },
    { index: 3, component: <EnterNewPassWord /> },
  ];

  return <StepComponentProcess {...orderList.find(component => component.index === orderIndex)} />;
};

export default SearchPassword;
