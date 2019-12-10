export const firstBefore = (thisElement, query) => {
  const elements = document.querySelectorAll(query);
  for (let index = 0; index < elements.length; index++) {
    if (elements[index] === thisElement && index > 0)
      return elements[index - 1];
  }
};

export const firstAfter = (thisElement, query) => {
  const elements = document.querySelectorAll(query);
  for (let index = 0; index < elements.length; index++) {
    if (elements[index] === thisElement && index < elements.length - 1)
      return elements[index + 1];
  }
};
