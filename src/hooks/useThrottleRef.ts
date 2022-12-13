import React, { useRef } from 'react';

type Props = {};

const useThrottleRef = (callback: () => void) => {
  const throttleRef = useRef<boolean | null>(null);

  const callbackApi = () => {
    if (!throttleRef.current) return;
    throttleRef.current = false;

    setTimeout(() => {
      throttleRef.current = true;
      callback();
    }, 600);
  };

  return callbackApi;
};

export default useThrottleRef;
