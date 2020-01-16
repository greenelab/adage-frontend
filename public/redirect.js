// from https://github.com/rafrex/spa-github-pages/blob/gh-pages/index.html

const { search, pathname, hash } = window.location;

if (search) {
  const q = {};
  search
    .slice(1)
    .split('&')
    .forEach((v) => {
      const a = v.split('=');
      q[a[0]] = a
        .slice(1)
        .join('=')
        .replace(/~and~/g, '&');
    });
  if (q.p !== undefined) {
    window.history.replaceState(
      null,
      null,
      pathname.slice(0, -1) + (q.p || '') + (q.q ? '?' + q.q : '') + hash
    );
  }
}
