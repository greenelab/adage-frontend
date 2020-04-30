import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// headless helper component to set document/tab title

const appTitle = process.env.REACT_APP_TITLE || '';

const Head = () => {
  const location = useLocation();

  useEffect(() => {
    // get page name (eg genes)
    const page = location.pathname
      .split('/')
      .filter((segment) => segment.trim())[0];

    // get selected items from url
    const params = new URLSearchParams(location.search);
    const genes = params.get('genes') || '';
    const experiment = params.get('experiment') || '';
    const diamonds = params.get('diamond-samples') || '';
    const spades = params.get('spade-samples') || '';
    const signature = params.get('signature') || '';

    // make props string based on selected items
    const props = [];
    const makeProp = (name, prop, plural) => {
      if (plural && prop.includes('-'))
        props.push(name + 's ' + prop.replace(/-/g, ', '));
      else
        props.push(name + ' ' + prop);
    };

    if (genes)
      makeProp('gene', genes, true);
    if (experiment)
      makeProp('experiment', experiment, false);
    if (diamonds)
      makeProp('diamond', diamonds, true);
    if (spades)
      makeProp('spade', spades, true);
    if (signature)
      makeProp('signature', signature, false);

    // concat page and props into final title
    const title = [appTitle, page, props.join(' ')]
      .filter((e) => e)
      .join(' · ');

    // set title
    document.title = title;
  }, [location]);

  return <></>;
};

export default Head;
