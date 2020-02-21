import { svg } from '../plot';
import { downloadSvg } from '../../../../util/download';

export const downloadImage = () => {
  downloadSvg(svg.node(), 'volcano');
};
