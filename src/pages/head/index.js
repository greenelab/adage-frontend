import React from 'react';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';

let Head = ({ location }) => {
  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';

    const params =
      (new URLSearchParams(location.search).get('selected') || '').split('-')
        .length + ' selected';

    const title = ['Adage', path, params].join(' · ');

    document.title = title;
  }, [location]);

  return <></>;
};

Head = withRouter(Head);

export default Head;
