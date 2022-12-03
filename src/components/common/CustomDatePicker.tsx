import React from 'react';
import DatePicker from 'react-datepicker';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

import 'react-datepicker/dist/react-datepicker.css';
interface CustomDatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  includeTimes?: Date[];
  excludeTimes?: Date[];
}

const CustomDatePicker = ({ value, onChange, includeTimes, excludeTimes }: CustomDatePickerProps) => {
  return (
    <DatePicker
      selected={value}
      onChange={date => onChange(date!)}
      showTimeSelect
      showTimeSelectOnly
      excludeTimes={excludeTimes} // Other User 선택한 시간
      includeTimes={includeTimes} // 운영시간
      timeIntervals={30}
      placeholderText="Click to select a time"
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};

export default CustomDatePicker;
