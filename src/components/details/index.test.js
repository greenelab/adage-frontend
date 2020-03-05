import React from 'react';
import { render } from '@testing-library/react';

import Details from './';

test('details component', () => {
  // render
  const { container } = render(
    <Details
      data={{
        id: 42,
        description: 'hello adage',
        invalid: NaN,
        array: [42, 42, 42, 42, 42]
      }}
    />
  );
  const element = container;

  // basic;
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent('42');
  expect(element).toHaveTextContent('hello adage');
  expect(element).toHaveTextContent('-');
  expect(element).toHaveTextContent('5');
});
