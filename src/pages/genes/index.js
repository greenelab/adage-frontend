import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Selected from './selected';
import Enriched from './enriched';
import Network from './network';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <Section text='Gene Search'>
        <Search />
      </Section>
      <Section text='Selected Genes'>
        <Selected />
      </Section>
      <Section text='Enriched Signatures'>
        <Enriched />
      </Section>
      <Section text='Gene Network'>
        <Network />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Genes;

export const mapGene = (gene) => ({
  ...gene,
  id: gene.id,
  standardName: gene.standard_name,
  systematicName: gene.systematic_name,
  name: gene.standard_name || gene.systematic_name || gene.entrezid || '???',
  entrezId: gene.entrezid,
  description: gene.description,
  aliases: gene.aliases,
  organism: gene.organism
});

export const mapGeneDownload = (gene) => ({
  'Standard Name': gene.standard_name || '-',
  'Systematic Name': gene.systematic_name || '-',
  'Entrez Id': gene.entrezid || '-',
  'Description': gene.description || '-',
  'Aliases': gene.aliases || '-',
  'Organism': gene.organism || '-'
});

export const mapGeneTooltip = (gene) => ({
  'Standard Name': gene.standard_name || '-',
  'Systematic Name': gene.systematic_name || '-',
  'Entrez Id': gene.entrezid || '-',
  'Description': gene.description || '-',
  'Aliases': gene.aliases || '-',
  'Organism': gene.organism || '-'
});

export const mapEdgeTooltip = (link) => ({
  Weight: link.weight.toFixed(4) || '-'
});
