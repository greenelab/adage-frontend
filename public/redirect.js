// based on https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

// this script requires the app be hosted at root level
// eg. greenelab.github.io/adage-frontend will not work properly

const { search, href: oldUrl } = window.location;

const path = new URLSearchParams(search).get('path') || '';
const newUrl = decodeURIComponent(path);

console.log({ oldUrl, newUrl });

if (newUrl)
  window.history.replaceState(null, null, newUrl);
