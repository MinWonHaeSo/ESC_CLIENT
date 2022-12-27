import React, { useRef } from 'react';

type Props = {};

const useThrottleRef = (callback: () => void) => {
  const throttleRef = useRef<boolean>(false);

  const callbackApi = () => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    setTimeout(() => {
      throttleRef.current = false;
      callback();
    }, 600);
  };

  return callbackApi;
};

export default useThrottleRef;
