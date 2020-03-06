import React from 'react';
import { render } from '@testing-library/react';

import { actionStatuses } from '../../actions/fetch';
import FetchAlert from './';

test('fetch alert component', () => {
  // render
  const { container } = render(
    <FetchAlert
      status={actionStatuses.LOADING}
      subject='tribbles'
      className='test_class'
    />
  );
  const element = container.firstChild;

  // basic
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('test_class');
  expect(element).toHaveTextContent(/loading/i);
  expect(element).toHaveTextContent(/tribbles/i);
});
