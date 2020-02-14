import React from 'react';

import Clickable from '../../components/clickable';

// link to signature details page

const SignatureLink = ({ signature = {} }) => (
  <Clickable
    to={'/signature/' + signature.id}
    newTab
    text={signature.name}
    link
    aria-label={'Open details page for signature ' + signature.name}
  />
);

export default SignatureLink;
