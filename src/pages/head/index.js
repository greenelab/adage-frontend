import React from 'react';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';

let Head = ({ location }) => {
  useEffect(() => {
    const path = location.pathname
      .split('/')
      .filter((segment) => segment.trim())[0];

    const genes = (new URLSearchParams(location.search).get('genes') || '')
      .split('-')
      .filter((id) => id).length;
    const experiments =
      new URLSearchParams(location.search).get('experiments') || '';

    const params = [];
    if (genes)
      params.push(genes + ' selected');
    if (experiments)
      params.push(experiments);

    const title = ['Adage', path, ...params]
      .filter((entry) => entry)
      .join(' · ');

    document.title = title;
  }, [location]);

  return <></>;
};

Head = withRouter(Head);

export default Head;
