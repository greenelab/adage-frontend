import { downloadTsv } from '../../../../util/download';
import { humanizeKeys } from '../../../../util/object';

export const downloadTable = ({ participations }) => {
  const data = participations.map(humanizeKeys);
  downloadTsv(data, 'participating-genes');
};
