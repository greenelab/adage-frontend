// introduce artificial delay into async function
// useful for testing loading spinners and race conditions
export const sleep = (ms) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));
