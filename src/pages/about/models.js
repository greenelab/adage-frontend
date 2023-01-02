import React from 'react';

import './models.css';

const Models = () => (
  <>
    <p className='help_header weight_semibold size_medium'>
      Expression compendium
    </p>
    <p>
      The models make use of the Recount3 mouse expression compendium.
      Our version was downloaded in 2021 and contains hundreds of thousands of samples.
      It does not include any samples uploaded after the build date. 
      By including all samples in a unified
      compendium (as opposed to separated by experiment) it allows for
      cross-experiment comparisons that reveal interesting trends that weren't
      directly probed for in a previous controlled experiment.
    </p>
    <p className='help_header weight_semibold size_medium'>Experiments</p>
    <p>
      Each experiment consists of samples deposited together, designed and annotated
      as the experiment's authors chose. Experiments vary in the number of samples they
      contain. Samples may be from different conditions or replicates. The
      annotations that accompany each experiment can help interpret the samples
      and signature activities within each experiment.
    </p>
    <p className='help_header weight_semibold size_medium'>Samples</p>
    <p>
      We include all bulk mouse RNA-seq samples from the Recount3 compendium in our dataset.
      Samples come from a variety of labs, tissues, and phenotypes.
    </p>
    <p className='help_header weight_semibold size_medium'>Genes</p>
    <p>
      The models are built with the subset of genes present in both the Recount3
      compendium and the prior knowledge gene sets used to train the model.
      Some genes are connected to many genes while others are connected to
      fewer genes. Currently, the genes in the network view are ranked without
      background correction so that the view prioritizes the genes that are most
      connected to the query genes. If the correction were applied, the view
      would prioritize genes that are more connected to the query genes than to
      other genes.
    </p>
    <p className='help_header weight_semibold size_medium'>Latent Variables</p>
    <p>
      Latent variables (LVs) are sets of genes extracted by the model.
      LVs are trained to reconstruct the compendium of
      gene expression data and thus the genes in an LV are likely to have
      correlated expression values across the compendium. Additionally, the
      LVs are encouraged to resemble prior-knowledge gene sets specified before
      the model was trained.
      LVs can suggest mechanisms of mouse biology. 
      Further, genes that are annotated as functionally
      related using KEGG pathways or GO terms are often found grouped in
      LVs. However, many LVs contain genes whose interactions are
      yet undetermined, and these can help generate hypotheses.
    </p>
    <p className='help_header weight_semibold size_medium'>Gene Weights</p>
    <p>
      For each latent variable, every gene has weight describing the extent 
      to which it influences the LV's activity. Genes with high weights for a 
      given latent variable influence the activity to a large degree, while 
      genes with smaller weights have less influence. 
    </p>
  </>
);

export { Models };
