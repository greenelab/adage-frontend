import { svg } from '../heatmap';
import { downloadSvg } from '../../../../util/download';
import { downloadTsv } from '../../../../util/download';

export const downloadImage = () => {
  downloadSvg(svg.node(), 'experiment-activites');
};

export const downloadTable = ({ activities }) => {
  const data = activities.map((activity) => ({
    Sample: activity.sample.name,
    Signature: activity.signature.name,
    Activity: activity.value
  }));
  downloadTsv(data, 'sample-activities');
};
