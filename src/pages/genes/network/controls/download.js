import { svg } from '../graph';
import { downloadSvg } from '../../../../util/download';
import { downloadTsv } from '../../../../util/download';

export const downloadImage = () => {
  const clone = svg.node().cloneNode(true);
  const highlights = clone.querySelectorAll('g[id*="highlight"]');
  for (const highlight of highlights)
    highlight.remove();
  downloadSvg(clone.outerHTML, 'gene-network');
};

export const downloadTable = ({ links }) => {
  const data = links.map((link) => ({
    gene1_standard_name: link.source.standardName,
    gene1_systematic_name: link.source.systematicName,
    gene1_entrez_id: link.source.entrezId,
    gene2_standard_name: link.target.standardName,
    gene2_systematic_name: link.target.systematicName,
    gene2_entrez_id: link.target.entrezId,
    edge_weight: link.weight
  }));
  downloadTsv(data, 'gene-network');
};
