import { useState, useEffect } from 'react';
const useDefaultTime = (hours:number, minutes:number) => {
  const [time, setTime] = useState<Date>(new Date);

  useEffect(() => {
    const defaultTime = new Date();
    defaultTime.setHours(hours);
    defaultTime.setMinutes(minutes);
  
    setTime(defaultTime);
  },[hours, minutes])

  return time
}

export default useDefaultTime;