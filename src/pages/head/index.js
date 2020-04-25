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
    const params = new URLSearchParams(location.search);
    const genes = (params.get('genes') || '').split('-').filter((id) => id)
      .length;
    const experiment = params.get('experiment') || '';
    const diamonds = (params.get('diamond-samples') || '')
      .split('-')
      .filter((id) => id).length;
    const spades = (params.get('spade-samples') || '')
      .split('-')
      .filter((id) => id).length;

    // make props string based on selected items
    const props = [];
    if (genes)
      props.push(genes + ' genes');
    if (experiment)
      props.push(experiment);
    if (diamonds)
      props.push(diamonds + ' diamonds');
    if (spades)
      props.push(spades + ' spades');

    // concat page and props into final title
    const title = ['Adage', page, ...props]
      .filter((entry) => entry)
      .join(' · ');

    // set title
    document.title = title;
  }, [location]);

  return <></>;
};

export default Head;
