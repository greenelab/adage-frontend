import React from 'react';

import Table from './table';
import Controls from './controls';

import './index.css';

const Selected = () => (
  <>
    <Table />
    <Controls/>
  </>
);

export default Selected;

export const mapGeneSelected = (selected) => ({
  id: selected.id,
  systematicName: selected.systematic_name,
  standardName: selected.standard_name,
  entrezId: selected.entrezid,
  description: selected.description,
  aliases: selected.aliases,
  weight: selected.weight,
  raw: selected
});
