// convert underscore_case and dash-case to Human Case
export const toHumanCase = (string) => {
  string = string.replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2').split(/_|-|\s+/);
  string = string.map(
    (word) => word.charAt(0).toUpperCase() + word.substring(1)
  );
  string = string.join(' ');
  return string;
};

// convert underscore_case and dash-case to camelCase
export const toCamelCase = (string) => {
  string = string.replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2').split(/_|-|\s+/);
  string = string.map((word, index) =>
    index > 0 ? word.charAt(0).toUpperCase() + word.substring(1) : word
  );
  string = string.join('');
  return string;
};

// test if string is link to external resource (on a different domain/host)
export const isExternalLink = (string) => {
  try {
    return new URL(string).hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};

const transformOperations = [
  'translate',
  'rotate',
  'scale',
  'translateX',
  'translateY',
  'scaleX',
  'scaleY'
];

// turn list of transform operations and parameters into transform string
export const transformString = (...args) => {
  const operations = [];
  for (const arg of args) {
    if (transformOperations.includes(arg))
      operations.push({ name: arg, parameters: [] });
    else
      operations[operations.length - 1].parameters.push(arg);
  }

  return operations
    .map(
      (operation) => operation.name + '(' + operation.parameters.join(',') + ')'
    )
    .join(' ');
};
