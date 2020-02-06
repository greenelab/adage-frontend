import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

// get updated bounding box of element that ref is attached to
// updated when window is resized
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
    return () => {
      window.removeEventListener('resize', set);
    };
  }, [ref]);

  return [bbox, ref];
};

// use the previous value of a variable
export const usePrev = (previousValue) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = previousValue;
  });
  return ref.current;
};

// get the inner text of an element
// useful for generating labels from components
export const useInnerText = () => {
  const ref = useRef();
  const text = ref?.current?.innerText ? ref.current.innerText : '';

  return [text, ref];
};
