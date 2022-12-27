import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';
import { useState, useEffect } from 'react';

const useDatepickerTIme = (startDate: number, endDate = 24) => {
  const [includeTime, setIncludeTime] = useState<Date[]>([]);

  useEffect(() => {
    let times = [];

    for (let i = startDate + 1; i < endDate; i++) {
      times.push(setHours(setMinutes(new Date(), 0), i));
      times.push(setHours(setMinutes(new Date(), 30), i));
    }

    setIncludeTime(times);
  }, [startDate, endDate]);

  return includeTime;
};

export default useDatepickerTIme;
