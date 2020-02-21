import { svg } from '../heatmap';
import { downloadSvg } from '../../../../util/download';
import { downloadTsv } from '../../../../util/download';

export const downloadImage = () => {
  downloadSvg(svg.node(), 'activites');
};

export const downloadTable = ({ activities }) => {
  const data = activities.map((activity) => ({
    Sample: activity.sampleName,
    Signature: activity.signatureName,
    Activity: activity.value
  }));
  downloadTsv(data, 'activities');
};
