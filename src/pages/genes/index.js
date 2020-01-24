import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Search from './search';
import Selected from './selected';
import Enriched from './enriched';
import Network from './network';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Gene Search' />
      <section>
        <Search />
      </section>
      <SectionHeader text='Selected Genes' />
      <section>
        <Selected />
      </section>
      <SectionHeader text='Enriched Signatures' />
      <section>
        <Enriched />
      </section>
      <SectionHeader text='Gene Network' />
      <section>
        <Network />
      </section>
    </Main>
    <Footer />
  </>
);

export default Genes;

export const mapGene = (gene) => ({
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
