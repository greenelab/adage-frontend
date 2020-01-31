import * as color from 'color';

// map number to css color based on specified gradient
// gradient should be in format [ ... , [number, 'rgba()'], ... ]
export const toGradient = (value, gradient) => {
  if (!Array.isArray(gradient) || !gradient.length)
    return 'rgba(255, 255, 255, 0)';

  const number = Number(value);

  // sort gradient by number
  gradient.sort((a, b) => a[0] - b[0]);

  // if provided number is outside range of gradient, return boundary color
  if (number < gradient[0][0])
    return gradient[0][1];
  if (number > gradient[gradient.length - 1][0])
    return gradient[gradient.length - 1][1];

  // find gradient entry below and above provided number
  let lowerIndex = 0;
  let upperIndex = gradient.length - 1;
  for (let index = 0; index < gradient.length - 1; index++) {
    if (gradient[index][0] <= number && gradient[index + 1][0] > number) {
      lowerIndex = index;
      upperIndex = index + 1;
      break;
    }
  }

  // get number and color below and above provided number
  const lowerNumber = gradient[lowerIndex][0];
  const lowerColor = color(gradient[lowerIndex][1]);
  const upperNumber = gradient[upperIndex][0];
  const upperColor = color(gradient[upperIndex][1]);

  // interpolate between below and above colors
  const percent = (number - lowerNumber) / (upperNumber - lowerNumber);
  const resultColor = lowerColor.mix(upperColor, percent);

  // return color
  return resultColor || 'rgba(255, 255, 255, 0)';
};
