export const server = 'https://py3-adage.greenelab.com/api/v1/';

export const fetchJson = async (url, root) => {
  const cachedResponse = window.sessionStorage.getItem(url);
  if (cachedResponse)
    return JSON.parse(cachedResponse);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(response);

  let payload = await response.json();
  if (!root)
    payload = payload.results;

  window.sessionStorage.setItem(url, JSON.stringify(payload));

  return payload;
};
