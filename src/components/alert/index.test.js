import React from 'react';
import { render } from '@testing-library/react';

import Alert from './';

test('alert component', () => {
  // render
  const { container } = render(
    <Alert text='hello adage' className='test_class' />
  );
  const element = container.firstChild;

  // basic
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('test_class');
  expect(element).toHaveTextContent('hello adage');
});
