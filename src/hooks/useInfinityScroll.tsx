import { useEffect, useRef } from 'react';

const useInfinityScroll = (getNextPage: () => void) => {
  const $refTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!$refTarget.current) return;

    const infinityScroll = new IntersectionObserver((entreis, observer) => {
      if (entreis[0].isIntersecting) {
        getNextPage();
      }
    });

    infinityScroll.observe($refTarget.current);

    return () => {
      infinityScroll.disconnect();
    };
  }, [getNextPage]);

  return $refTarget;
};

export default useInfinityScroll;
