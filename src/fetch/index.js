const fetchJson = async ({ url, dontCache }) => {
  console.log('fetchJson()', url);
  const cachedResponse = window.sessionStorage.getItem(url);
  if (cachedResponse && !dontCache)
    return JSON.parse(cachedResponse);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(response);

  let json = {};
  json = await response.json();

  if (!dontCache)
    window.sessionStorage.setItem(url, JSON.stringify(json));

  return json.results;
};

export default fetchJson;
