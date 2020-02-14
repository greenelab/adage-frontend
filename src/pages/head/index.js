import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// headless helper component to set document/tab title

const Head = () => {
  const location = useLocation();

  useEffect(() => {
    // get page name (eg genes)
    const page = location.pathname
      .split('/')
      .filter((segment) => segment.trim())[0];

    // get selected items from url
    const genes = (new URLSearchParams(location.search).get('genes') || '')
      .split('-')
      .filter((id) => id).length;
    const experiments =
      new URLSearchParams(location.search).get('experiments') || '';

    // make params string based on selected items
    const params = [];
    if (genes)
      params.push(genes + ' selected');
    if (experiments)
      params.push(experiments);

    // concat page and params into final title
    const title = ['Adage', page, ...params]
      .filter((entry) => entry)
      .join(' · ');

    // set title
    document.title = title;
  }, [location]);

  return <></>;
};

export default Head;
