import { useEffect, useRef } from 'react';

const useDidMountEffect = (callback: () => void, dependencies: string[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, dependencies);
};

export default useDidMountEffect;
