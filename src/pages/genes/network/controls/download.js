import decode from 'unescape';

import { svg } from '../graph';
import { downloadSvg } from '../../../../util/download.js';

export const download = () => {
  downloadSvg(decode(svg.node().outerHTML), 'gene-network');
};
