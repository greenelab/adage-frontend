import './barcode.css';

export const width = 450;
export const height = 90;

export const getBackground = (values) =>
  drawBarcode({
    values,
    color: '#000000',
    lineWidth: 3,
    lineHeight: 30
  });

export const getForeground = (values) =>
  drawBarcode({
    values,
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
