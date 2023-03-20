import React, { useEffect, useState } from 'react';

type Props = {};

const useDebounce = <T>(callback: T, delay = 300) => {
  const [_, setDebounce] = useState(callback);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(callback);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, callback]);

  return () => {};
};

export default useDebounce;
