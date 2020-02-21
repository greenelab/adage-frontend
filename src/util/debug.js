import YAML from 'yaml';

// introduce artificial delay into async function
// useful for testing loading spinners and race conditions
export const sleep = (ms) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

// synchronously log to console in prettified yaml
// useful for cases where browser shows live object rather than snapshot
window.console.logSync = (...args) => {
  const lines = YAML.stringify(args)
    .split('\n')
    .filter((line) => line.trim());
  for (const line of lines) {
    const index = line.indexOf(':');
    const key = line.substr(0, index);
    const value = line.substr(index + 1);
    console.log('%c' + key + '%c' + value, 'color: gray;', 'color: blue;');
  }
};
