import fetchJson from './';
import { queryGenes } from '../backend-queries';

const fetchGenes = async ({ search }) =>
  fetchJson({ url: queryGenes({ search: search }) });

export default fetchGenes;
