import { downloadTsv } from '../../../../util/download';

export const downloadTable = ({ enrichedSignatures }) => {
  const data = enrichedSignatures.map((enrichedSignature) => ({
    'Name': enrichedSignature.name,
    'Overlapping Genes': enrichedSignature.selectedParticipatingGenes
      .map((gene) => gene.systematicName)
      .join(' '),
    'p Value': enrichedSignature.pValue
  }));
  downloadTsv(data, 'enriched-signatures');
};
