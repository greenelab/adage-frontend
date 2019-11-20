import fetchJson from './';
import { queryModels } from '../backend-queries';

const fetchModels = async () => fetchJson({ url: queryModels() });

export default fetchModels;
