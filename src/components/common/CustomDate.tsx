import React from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
  excludeDays?: Date[];
  customInput?: React.ReactNode;
};

/**
 *? CustomTime이랑 동일한 컴포넌트를 반환하고 있다.
 *  ...rest 를 통해 Props를 받아오는것이 더 나은지?
 *  설정값이 다른 부분이 많기 때문에 개별로 관리하는 것이 불러 올 떄 더 간편한 것 같다.
 */

const CustomDate = ({ value, onChange, excludeDays, customInput }: Props) => {
  return (
    <DatePicker
      selected={value}
      onChange={date => onChange(date!)}
      locale={ko}
      minDate={new Date()}
      excludeDates={excludeDays}
      placeholderText="Click to select a Date"
      dateFormat={'yyyy-MM-dd'}
      customInput={customInput}
    />
  );
};

export default CustomDate;
