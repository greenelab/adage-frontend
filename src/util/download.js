export const downloadTsv = (data = [], filename = 'download') => {
  if (!data.length)
    return;

  const exclude = ['raw'];
  const keys = Object.keys(data[0]).filter((key) => !exclude.includes(key));
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
