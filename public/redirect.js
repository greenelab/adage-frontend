// based on https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

const path =
  window.decodeURIComponent(
    new URLSearchParams(window.location.search).get('path') || ''
  ) || null;

console.log(window.location.href);
console.log(path);

if (path) {
  window.setTimeout(
    () => window.history.replaceState(null, null, path),
    10 * 1000
  );
}
