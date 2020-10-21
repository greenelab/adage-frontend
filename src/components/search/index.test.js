import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import Search from './';

test('search component', () => {
  // render
  const SingleComponent = ({ highlightedIndex }) => (
    <div id='single_component' data-highlighted={highlightedIndex} />
  );
  const MultiComponent = () => <div id='single_component' />;
  const onKeySelect = jest.fn();
  const { container } = render(
    <Search
      multi
      length={6}
      SingleComponent={<SingleComponent />}
      MultiComponent={<MultiComponent />}
      onKeySelect={onKeySelect}
    />
  );
  const input = () => container.querySelector('input');
  const textarea = () => container.querySelector('textarea');
  const expandButton = () =>
    container.querySelector('.input_button:nth-of-type(1)');
  const singleComponent = () => container.querySelector('#single_component');
  const multiComponent = () => container.querySelector('#single_component');

  // basic
  expect(input()).toBeInTheDocument();

  // expand/collapse
  expect(input()).toBeDefined();
  expect(textarea()).toBe(null);
  expect(singleComponent()).toBeInTheDocument();
  fireEvent.click(expandButton());
  expect(input()).toBe(null);
  expect(textarea()).toBeDefined();
  expect(multiComponent()).toBeInTheDocument();
  fireEvent.click(expandButton());

  // keyboard controls
  fireEvent.focus(input());
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  expect(singleComponent()).toHaveAttribute('data-highlighted', '3');
  fireEvent.keyDown(input(), { key: 'ArrowUp' });
  fireEvent.keyDown(input(), { key: 'ArrowUp' });
  expect(singleComponent()).toHaveAttribute('data-highlighted', '1');
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  fireEvent.keyDown(input(), { key: 'ArrowDown' });
  expect(singleComponent()).toHaveAttribute('data-highlighted', '5');
  fireEvent.keyDown(input(), { key: 'Enter' });
  expect(onKeySelect.mock.calls.length).toBe(1);
});
