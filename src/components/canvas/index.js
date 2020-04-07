import React, { useEffect } from 'react';
import { useRef } from 'react';

import './index.css';

// canvas component that renders canvas objects passed to it
// canvases are composited on top of each other

const Canvas = ({ canvases = [], className = '', ...rest }) => {
  const ref = useRef();

  const width = Math.max(...canvases.map((canvas) => canvas.width)) || 0;
  const height = Math.max(...canvases.map((canvas) => canvas.height)) || 0;

  useEffect(() => {
    if (!ref.current)
      return;

    const ctx = ref.current.getContext('2d');
    ref.current.width = width;
    ref.current.height = height;
    for (const canvas of canvases)
      ctx.drawImage(canvas, 0, 0, width, height);
  });

  return (
    <canvas
      ref={ref}
      className={className}
      width={width + 'px'}
      height={height + 'px'}
      {...rest}
    />
  );
};

export default Canvas;
