// based on https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

const { search, href: originalUrl } = location;

const newUrl =
  decodeURIComponent(new URLSearchParams(search).get('path') || '') || null;

console.log({ originalUrl, newUrl });

if (newUrl)
  history.replaceState(null, null, newUrl), 10 * 1000;
