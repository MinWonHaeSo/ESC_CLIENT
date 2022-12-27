import { useState, useEffect } from 'react';

const useDefaultTime = (timeZone: string) => {
  const [time, setTime] = useState<Date>(new Date);

  useEffect(() => {
    const defaultTime = new Date();
    defaultTime.setHours(Number(timeZone.split(':')[0]));
    defaultTime.setMinutes(Number(timeZone.split(':')[1]));
  
    setTime(defaultTime);
  },[timeZone])

  return time
}

export default useDefaultTime;