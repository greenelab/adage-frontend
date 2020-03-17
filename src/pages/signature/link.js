import React from 'react';

import Clickable from '../../components/clickable';

// link to signature details page

const SignatureLink = ({ signature = {} }) => (
  <Clickable
    to="/signatures/"
    search={{ signature: signature.id }}
    text={signature.name}
    link
    aria-label={'Open details page for signature ' + signature.name}
  />
);

export default SignatureLink;
