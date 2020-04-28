// based on https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

const { search, href: originalUrl } = window.location;

const newUrl = decodeURIComponent(
  new URLSearchParams(search).get('path') || ''
);

console.log({ originalUrl, newUrl });

if (newUrl)
  window.history.replaceState(null, null, newUrl);
