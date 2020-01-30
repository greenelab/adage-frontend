import decode from 'unescape';

import { svg } from '../graph';
import { downloadSvg } from '../../../../util/download.js';

export const download = () => {
  const clone = svg.node().cloneNode(true);
  const highlights = clone.querySelectorAll('g[id*="highlight"]');
  for (const highlight of highlights)
    highlight.remove();
  downloadSvg(decode(clone.outerHTML), 'gene-network');
};
