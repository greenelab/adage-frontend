import React from 'react';
import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';

let Head = ({ location }) => {
  useEffect(() => {
    const path = location.pathname.slice(1);
    const selected = (
      new URLSearchParams(location.search).get('selected') || ''
    )
      .split('-')
      .filter((id) => id).length;
    let params;
    if (selected)
      params = selected + ' selected';

    const title = ['Adage', path, params].filter((entry) => entry).join(' · ');

    document.title = title;
  }, [location]);

  return <></>;
};

Head = withRouter(Head);

export default Head;
