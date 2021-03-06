import { svg } from '../graph';
import { downloadSvg } from '../../../../util/download';
import { downloadTsv } from '../../../../util/download';

export const downloadImage = () => {
  downloadSvg(svg.node(), 'gene-network', 'g[id*="highlight"]');
};

export const downloadTable = ({ links }) => {
  const data = links.map((link) => ({
    'Gene1 Standard Name': link.source.standardName,
    'Gene1 Systematic Name': link.source.systematicName,
    'Gene1 Entrez Id': link.source.entrezId,
    'Gene2 Standard Name': link.target.standardName,
    'Gene2 Systematic Name': link.target.systematicName,
    'Gene2 Entrez Id': link.target.entrezId,
    'Edge Weight': link.weight
  }));
  downloadTsv(data, 'gene-network');
};
