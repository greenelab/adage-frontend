import { svg } from '../graph';
import { downloadSvg } from '../../../../util/download.js';

export const download = () => {
  const clone = svg.node().cloneNode(true);
  const highlights = clone.querySelectorAll('g[id*="highlight"]');
  for (const highlight of highlights)
    highlight.remove();
  downloadSvg(clone.outerHTML, 'gene-network');
};
