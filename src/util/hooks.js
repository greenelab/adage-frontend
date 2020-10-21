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
          leftAbsolute: bbox.left + window.scrollX,
          topAbsolute: bbox.top + window.scrollY,
          rightAbsolute: bbox.right + window.scrollX,
          bottomAbsolute: bbox.bottom + window.scrollY
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
export const usePrev = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

// return whether it is first render
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

// return whether value has changed since last render
export const useDiff = (value) => {
  const prevValue = useRef(undefined);
  useEffect(() => {
    prevValue.current = value;
  });
  return JSON.stringify(value) !== JSON.stringify(prevValue.current);
};

// get the inner text of an element
// useful for generating labels from components
export const useInnerText = () => {
  const ref = useRef();
  const text = ref?.current?.innerText ? ref.current.innerText : '';

  return [text, ref];
};

// include script tag in jsx
// necessary because react doesn't seem to run <script>'s in jsx
export const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [url]);
};

// useState, but persisted in local storage
export const useStorage = (defaultValue, key = '') => {
  const [state, setState] = useState(get(key) || defaultValue);

  useEffect(() => {
    set(state, key);
  }, [key, state]);

  return [state, setState];
};
const prefix = 'adage';
const get = (key) => JSON.parse(localStorage.getItem(prefix + key));
const set = (state, key) =>
  localStorage.setItem(prefix + key, JSON.stringify(state));
