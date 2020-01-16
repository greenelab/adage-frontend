import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const useBbox = () => {
  const ref = useRef();
  const [bbox, setBbox] = useState(null);

  const set = () => {
    const bbox = ref.current.getBoundingClientRect();
    setBbox(
      ref?.current ?
        {
          left: bbox.left,
          top: bbox.top,
          right: bbox.right,
          bottom: bbox.bottom,
          width: bbox.width,
          height: bbox.height,
          clientWidth: ref.current.clientWidth,
          clientHeight: ref.current.clientHeight
        } :
        null
    );
  };

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    let observer;
    if (window.ResizeObserver)
      observer = new ResizeObserver(set);
    if (observer && ref?.current)
      observer.observe(ref.current);
    return () => {
      window.removeEventListener('resize', set);
      if (observer)
        observer.disconnect();
    };
  }, [ref]);

  return [bbox, ref];
};

export const usePrev = (previousValue) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = previousValue;
  });
  return ref.current;
};

export const useInnerText = () => {
  const ref = useRef();
  const text = ref?.current?.innerText ? ref.current.innerText : '';

  return [text, ref];
};
