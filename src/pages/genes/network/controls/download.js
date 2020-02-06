import { svg } from '../graph';
import { downloadSvg } from '../../../../util/download';

export const download = () => {
  const clone = svg.node().cloneNode(true);
  const highlights = clone.querySelectorAll('g[id*="highlight"]');
  for (const highlight of highlights)
    highlight.remove();
  downloadSvg(clone.outerhtml, 'gene-network');
};
