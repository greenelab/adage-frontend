import React from 'react';

import Link from '../../components/link';

// link to signature details page

const SignatureLink = ({ signature = {} }) => (
  <Link
    to={'/signature/' + signature.id}
    newTab
    button={false}
    text={signature.name}
    aria-label={'Open details page for signature ' + signature.name}
  />
);

export default SignatureLink;
