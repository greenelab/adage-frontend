import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const useBbox = () => {
  const ref = useRef();
  const [bbox, setBbox] = useState(null);

  const set = () =>
    setBbox(
      ref?.current ?
        {
          ...ref.current.getBoundingClientRect(),
          clientWidth: ref.current.clientWidth,
          clientHeight: ref.current.clientHeight,
        } :
        null
    );

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [bbox, ref];
};

export const usePrev = (previousValue) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = previousValue;
  });
  return ref.current;
};
