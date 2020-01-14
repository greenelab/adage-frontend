// based on https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

const path = JSON.parse(
  window.atob(new URLSearchParams(window.location.search).get('path') || '') ||
    null
);

if (path) {
  const url = (path.pathname || '') + (path.search || '');
  window.history.replace(null, null, url);
}
