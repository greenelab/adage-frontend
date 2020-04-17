import React from 'react';

import './models.css';

const Models = () => (
  <>
    <p className='help_header weight_semibold size_medium'>
      Expression compendium
    </p>
    <p>
      The models make use of the Pseudomonas Aeruginosa expression compendium.
      It was built on July 31 2015 and contains 125 datasets with 1,051
      individual samples. Each dataset is an experiment and all samples are
      collected in a non-redundant way into the compendium. If a sample is part
      of multiple experiments, it is only represented once in the compendium. It
      did not include any datasets uploaded after the build date. It was
      manually annotated by biologists into easily queried fields including
      strain, medium, genotype and more. By including all samples in a unified
      compendium (as opposed to separated by experiment) it allows for
      cross-experiment comparisons that reveal interesting trends that weren’t
      directly probed for in a previous controlled experiment.
    </p>
    <p className='help_header weight_semibold size_medium'>Experiments</p>
    <p>
      Experiments are obtained from the ArrayExpress database. Each experiment
      has a “E-XXXX-number” accession number defined by ArrayExpress. Each
      experiment consists of samples deposited together, designed and annotated
      as the authors chose. Experiments vary in the number of samples they
      contain. Samples may be from different conditions or replicates. The
      annotations that accompany each experiment can help interpret the samples
      and signature activities within each experiment.
    </p>
    <p className='help_header weight_semibold size_medium'>Samples</p>
    <p>
      We include samples measured on the Affymetrix Pseudomonas aeruginosa Array
      "Pae_G1a" (labeled as A-AFFY-30 in ArrayExpress database). Built from
      accessible datasets from the{' '}
      <a href='https://www.ebi.ac.uk/arrayexpress/'>ArrayExpress database</a>.
      Samples come from a variety of labs, conditions, genotypes, and growth
      phases.
    </p>
    <p className='help_header weight_semibold size_medium'>Genes</p>
    <p>
      The models are built with genes represented by probes on the Affymetrix
      microarray gene chip "Pae_G1a" and annotated as the Pseudomonas aeruginosa
      PAO1 reference strain. Genes are labeled with PA numbers or gene names, if
      available. Further annotations, PA14 homologues, and information about
      gene function can be found at{' '}
      <a href=' http://pseudomonas.com'>pseudomonas.com</a>. Information about
      the PAO1 genes used to build this server was obtained from{' '}
      <a href='ftp://ftp.ncbi.nih.gov/gene/DATA/GENE_INFO/Archaea_Bacteria/Pseudomonas_aeruginosa_PAO1.gene_info.gz'>
        NCBI
      </a>
      . Some genes are connected to many genes while others are connected to
      fewer genes. Currently, the genes in the network view are ranked without
      background correction so that the view prioritizes the genes that are most
      connected to the query genes. If the correction were applied, the view
      would prioritize genes that are more connected to the query genes than to
      other genes.
    </p>
    <p className='help_header weight_semibold size_medium'>Nodes</p>
    <p>
      Nodes are building units in the models. Each node is defined by a weight
      vector storing the weight value of each gene in that node. The number of
      nodes in the models (300) was predetermined using empirical evaluation of
      models built using a range of sizes. On the other hand, the weights for
      each gene in each node were learned by the model in an unsupervised way.
      Each node is characterized by two signatures.
    </p>
    <p className='help_header weight_semibold size_medium'>Signatures</p>
    <p>
      Signatures are functional gene sets extracted by the models. A signature
      contains genes contributing extremely positive high or negative high
      weights to a specific node. One node results in two signatures on positive
      and negative sides. The positive and negative signatures are treated
      independently. Signatures are trained to reconstruct the compendium of
      gene expression data and thus the genes in a signature are likely to have
      correlated expression values across the compendium. Such correlations can
      suggest mechanisms of Pseudomonas biology. For example, signatures
      typically contain co-operonic genes, which are examples of meaningful
      correlated expression. Further, genes that are annotated as functionally
      related using KEGG pathways or GO terms are often found grouped in
      signatures. However, many signatures contain genes whose interactions are
      yet undetermined, and these can help generate hypotheses.
    </p>
    <p className='help_header weight_semibold size_medium'>High Weight Gene</p>
    <p>
      The models are made up of features, also known as nodes. For each feature,
      every gene has a positive or negative weight. A signature is composed of
      the genes on one side (positive or negative) of a feature. The genes that
      are termed high weight are those that are 2.5 or more standard deviations
      from the mean gene weight. These high weight genes are used to
      characterize each signature because their expression levels have the
      largest influence on the activity of the signature.
    </p>
  </>
);

export { Models };
