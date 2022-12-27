import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomTimeProps {
  value: Date;
  onChange: (date: Date) => void;
  includeTimes?: Date[];
  excludeTimes?: Date[];
  customInput?: React.ReactNode;
}

const CustomTime = ({ value, onChange, includeTimes, excludeTimes, customInput }: CustomTimeProps) => {
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
      customInput={customInput}
    />
  );
};

export default CustomTime;
