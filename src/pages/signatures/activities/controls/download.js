import { downloadTsv } from '../../../../util/download';

export const downloadTable = ({ byExperiment }) => {
  const data = byExperiment.map((activity) => ({
    'Experiment': activity.accession,
    'Activity Range': activity.range,
    'Min Activity': activity.min,
    'Max Activity': activity.max
  }));
  downloadTsv(data, 'experiment-activities');
};
