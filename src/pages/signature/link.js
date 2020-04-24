import React from 'react';

import Clickable from '../../components/clickable';

// link to signature details page

const SignatureLink = ({ signature = {} }) => {
  const { id, name } = signature;
  const label = name || id || '-';

  return (
    <Clickable
      to='/signatures'
      search={{ signature: id }}
      text={label}
      link
      aria-label={'Open details page for signature ' + label}
    />
  );
};

export default SignatureLink;
