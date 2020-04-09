import React from 'react';

import { ModelController } from './models';
import { OrganismController } from './organisms';
import { GeneController } from './genes';
import { ExperimentController } from './experiments';
import { SampleController } from './samples';
import { SignatureController } from './signatures';

// dispatch new actions in response to redux state changes

export const MAX_INT = 9999999;

const Controllers = () => (
  <>
    <ModelController />
    <OrganismController />
    <GeneController />
    <ExperimentController />
    <SampleController />
    <SignatureController />
  </>
);

export default Controllers;
