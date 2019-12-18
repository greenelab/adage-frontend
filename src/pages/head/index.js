import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

let Head = ({ location }) => {
  const path = location.pathname.slice(1);

  const params =
    (new URLSearchParams(location.search).get('selected') || '').split('-')
      .length + ' selected';

  const title = ['Adage', path, params].join(' · ');

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

Head = withRouter(Head);

export default Head;
