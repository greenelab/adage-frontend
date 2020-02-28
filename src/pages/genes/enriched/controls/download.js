import { downloadTsv } from '../../../../util/download';
import { humanizeKeys } from '../../../../util/object';

export const downloadTable = ({ enrichedSignatures }) => {
  const data = enrichedSignatures
    .map((enrichedSignature) => ({
      name: enrichedSignature.name,
      overlappingGenes: enrichedSignature.selectedParticipatingGenes
        .map((gene) => gene.systematicName)
        .join(' '),
      pValue: enrichedSignature.pValue
    }))
    .map(humanizeKeys);

  downloadTsv(data, 'enriched-signatures');
};
