import { downloadTsv } from '../../../../util/download';
import { humanizeKeys } from '../../../../util/object';

export const downloadTable = ({ selected }) => {
  const data = selected.map(humanizeKeys);
  downloadTsv(data, 'samples');
};
