import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import EnterNewPassWord from './EnterNewPassWord';
import EnterValidateCode from './EnterValidateCode';
import SearchPasswordProcess from './SearchPassWordProcess';
import ValidateEmail from './ValidateEmail';

interface FindPassWordProps {}

const SearchPassWord = (props: FindPassWordProps) => {
  const orderIndex = useSelector((state: RootState) => state.searchPassWord.index);
  const orderList = [
    { index: 1, component: <ValidateEmail /> },
    { index: 2, component: <EnterValidateCode /> },
    { index: 3, component: <EnterNewPassWord /> },
  ];

  return <SearchPasswordProcess {...orderList[orderIndex]} />;
};

export default SearchPassWord;
