import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { modelIsLoaded } from '../../reducers/models';
import { actionStatuses } from '../../actions/fetch';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as ModelIcon } from '../../images/model.svg';

import './index.css';

// model details page

let Model = ({ selectedModel }) => (
  <>
    <Header />
    <Main>
      <Section
        header={
          <>
            <ModelIcon />
            <span>Model Details</span>
          </>
        }
      >
        {isObject(selectedModel) && <Details data={selectedModel} />}
        {isString(selectedModel) && (
          <FetchAlert status={selectedModel} subject='model details' />
        )}
      </Section>
    </Main>
    <Footer />
  </>
);

const mapStateToProps = (state) => {
  let selectedModel = state.models.selected;

  if (!selectedModel?.id)
    selectedModel = actionStatuses.EMPTY;
  else if (!modelIsLoaded(selectedModel))
    selectedModel = state.models.list;
  else if (isObject(selectedModel)) {
    selectedModel = filterKeys(selectedModel, [
      'directedG2gEdge',
      'g2gEdgeCutoff',
      'organism'
    ]);
    selectedModel = humanizeKeys(selectedModel);
  }

  return { selectedModel };
};

Model = connect(mapStateToProps)(Model);

export default Model;
