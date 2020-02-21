// download data as .tsv file
// data - [{key: value, key: value}, {key: value, key: value}]
export const downloadTsv = (data = [], filename = 'download') => {
  if (!data.length)
    return;

  const keys = Object.keys(data[0]);
  let content = [
    [...keys],
    ...data.map((datum) => keys.map((key) => datum[key]))
  ];
  content = content.map((cell) => cell.join('\t')).join('\n');

  const blob = new Blob(['\ufeff', content], {
    type: 'text/tsv;charset=utf-8'
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  document.body.appendChild(link);
  link.href = url;
  link.download = filename + '.tsv';
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
};

// download data as .svg file
// data - svg/html markdown
export const downloadSvg = (element, filename, removeQuery) => {
  const clone = element.cloneNode(true);
  if (removeQuery)
    clone.querySelectorAll(removeQuery).forEach((el) => el.remove());
  const data = clone.outerHTML;
  const blob = new Blob([data], { type: 'image/svg+xml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = url;
  link.download = (filename || 'data') + '.svg';
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
};
