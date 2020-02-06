// convert underscore_case and dash-case to Human Case
export const humanizeString = (string) => {
  string = string.split(/_|-/);
  string = string.map(
    (word) => word.charAt(0).toUpperCase() + word.substring(1)
  );
  string = string.join(' ');
  return string;
};

// convert underscore_case and dash-case to camelCase
export const camelizeString = (string) => {
  string = string.split(/_|-/);
  string = string.map((word, index) =>
    index > 0 ? word.charAt(0).toUpperCase() + word.substring(1) : word
  );
  string = string.join('');
  return string;
};
