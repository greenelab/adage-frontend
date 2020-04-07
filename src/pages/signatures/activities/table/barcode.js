import { normalize } from '../../../../util/math';

import './barcode.css';

export const width = 450;
export const height = 90;

export const getBackground = (values, min = 0, max = 1) =>
  drawBarcode({
    values: normalize(values, min, max),
    color: '#000000',
    lineWidth: 3,
    lineHeight: 30
  });

export const getForeground = (values, min = 0, max = 1) =>
  drawBarcode({
    values: normalize(values, min, max),
    color: '#26a36c',
    lineWidth: 3,
    lineHeight: 60
  });

const drawBarcode = ({
  values = [],
  color = '#000000',
  lineWidth,
  lineHeight
}) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const y1 = height / 2 - lineHeight / 2;
  const y2 = height / 2 + lineHeight / 2;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  for (const value of values) {
    ctx.beginPath();
    ctx.moveTo(value * width, y1);
    ctx.lineTo(value * width, y2);
    ctx.stroke();
  }

  return canvas;
};
