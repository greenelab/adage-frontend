import { downloadTsv } from '../../../../util/download';

export const downloadTable = ({ enrichedGenes }) => {
  const data = enrichedGenes.map((set) => ({
    'Name': set.name,
    'Database': set.database,
    'p Value': set.pValue,
    'Genes': set.genes.map((gene) => gene.standardName).join(' ')
  }));
  downloadTsv(data, 'enriched-gene-sets');
};
