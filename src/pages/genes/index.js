import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Selected from './selected';
import Enriched from './enriched';
import Network from './network';

import { camelizeObject } from '../../util/object.js';
import { humanizeObject } from '../../util/object.js';
import { flattenObject } from '../../util/object.js';

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
  ...camelizeObject(flattenObject(gene)),
  name: gene.standard_name || gene.systematic_name || gene.entrezid || '???',
  entrezId: gene.entrezid
});

export const mapGeneDownload = (gene) => humanizeObject(flattenObject(gene));
