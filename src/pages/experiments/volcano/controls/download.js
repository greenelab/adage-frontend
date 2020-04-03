import { svg } from '../plot';
import { downloadSvg } from '../../../../util/download';
import { downloadTsv } from '../../../../util/download';

export const downloadImage = () => {
  downloadSvg(svg.node(), 'volcano');
};

export const downloadTable = ({ volcano }) => {
  const data = volcano.map((d) => ({
    'Name': d.name,
    'Mean Diff': d.meanDiff,
    'p Value': d.pValue
  }));
  downloadTsv(data, 'volcano');
};
