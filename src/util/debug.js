export const sleep = (ms) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

window.console.logSync = (...args) => {
  try {
    args = args.map((arg) => JSON.parse(JSON.stringify(arg)));
    console.log(...args);
  } catch (error) {
    console.log('Error trying to console.logSync()', ...args);
  }
};
