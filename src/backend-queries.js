const server = 'https://py3-adage.greenelab.com/api/v1/';

const models = 'model/';
const genes = 'gene/';

export const queryModels = () => server + models;

export const queryGenes = ({ search }) => {
  const params = new URLSearchParams();
  if (search)
    params.set('autocomplete', search);

  return server + genes + '?' + params.toString();
};
