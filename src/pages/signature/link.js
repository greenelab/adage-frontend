import React from 'react';

import Clickable from '../../components/clickable';

// link to signatures page with selected signature

const SignatureLink = ({ signature = {} }) => {
  const { id, name } = signature;
  const label = name || id || '-';

  return (
    <Clickable
      to='/signatures'
      search={{ signature: id }}
      text={label}
      link
      aria-label={'Go to latent variables page and select latent variable ' + label}
    />
  );
};

export default SignatureLink;
