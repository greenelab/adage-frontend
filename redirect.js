// based on https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

const path =
  window.decodeURIComponent(
    new URLSearchParams(window.location.search).get('path') || ''
  ) || null;

if (path)
  window.history.replaceState(null, null, path);
