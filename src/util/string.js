// split string by lower to upper case and letter to number
// and convert to lower case
export const split = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    .toLowerCase()
    .split(/_|-|\s+/);

// convert camelCase, underscore_case, and dash-case to Human Case
export const toHumanCase = (string) =>
  split(string)
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

// convert camelCase, underscore_case, and dash-case to camelCase
export const toCamelCase = (string) =>
  split(string)
    .map((word, index) =>
      index > 0 ? word.charAt(0).toUpperCase() + word.substring(1) : word)
    .join('');

// test if string is link to external resource (on a different domain/host)
export const isExternalLink = (string) => {
  try {
    return new URL(string).hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};

// turn list of transform operations and parameters into transform string
export const transformString = (...args) => {
  const validOperations = [
    'translate',
    'rotate',
    'scale',
    'translateX',
    'translateY',
    'scaleX',
    'scaleY'
  ];

  const operations = [];
  for (const arg of args) {
    if (validOperations.includes(arg))
      operations.push({ name: arg, parameters: [] });
    else
      operations[operations.length - 1].parameters.push(arg);
  }

  return operations
    .map(
      (operation) =>
        operation.name + '(' + operation.parameters.join(', ') + ')'
    )
    .join(' ');
};
