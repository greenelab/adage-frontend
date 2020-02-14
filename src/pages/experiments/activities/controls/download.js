import { downloadTsv } from '../../../../util/download';

export const downloadTable = ({ activities }) => {
  const data = activities.map((activity) => ({
    Sample: activity.sampleName,
    Signature: activity.signatureName,
    Activity: activity.value
  }));
  downloadTsv(data, 'activities');
};
