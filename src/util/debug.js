// introduce artificial delay into async function
// useful for testing loading spinners and race conditions
export const sleep = (ms) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

// synchronously log to console
// useful for cases where browser shows live object rather than snapshot
window.console.logSync = (...args) => {
  try {
    args = args.map((arg) => JSON.parse(JSON.stringify(arg)));
    console.log(...args);
  } catch (error) {
    console.log('Error trying to console.logSync()', ...args);
  }
};
