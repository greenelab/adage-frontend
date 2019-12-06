// add artificial delay for testing
export const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, Math.round(ms)));
