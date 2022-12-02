import { RootState, useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import EnterNewPassWord from './EnterNewPassWord';
import EnterValidateCode from './EnterValidateCode';
import FindPassWordProcess from './FindPassWordProcess';
import ValidateEmail from './ValidateEmail';

const FindPassWord = () => {
  const orderIndex = useSelector((state: RootState) => state.findPassWord.index);
  const orderList = [
    { index: 1, component: <ValidateEmail /> },
    { index: 2, component: <EnterValidateCode /> },
    { index: 3, component: <EnterNewPassWord /> },
  ];

  return <FindPassWordProcess {...orderList[orderIndex]} />;
};

export default FindPassWord;
