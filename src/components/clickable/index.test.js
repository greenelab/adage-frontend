import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Clickable from './';

test('clickable component', () => {
  // render
  const { container } = render(
    <Clickable text='hello adage' link className='test_class' newTab />
  );
  const element = container.firstChild;

  // basic
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('clickable', 'test_class', 'nowrap');
  expect(element).toHaveAttribute('data-link', 'true');
  expect(element).toHaveAttribute('data-button', 'false');
  expect(element).toHaveAttribute('data-text', 'true');
  expect(element).toHaveAttribute('data-icon', 'false');
  expect(element).toHaveAttribute('target', '_blank');
  expect(element).toHaveTextContent('hello adage');
});

test('clickable component', () => {
  // render
  const { container } = render(
    <Clickable to='/nowhere' text='hello adage' button icon={<></>} />,
    { wrapper: MemoryRouter }
  );
  const element = container.firstChild;

  // basic
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('clickable');
  expect(element).toHaveAttribute('data-link', 'false');
  expect(element).toHaveAttribute('data-button', 'true');
  expect(element).toHaveAttribute('data-text', 'true');
  expect(element).toHaveAttribute('data-icon', 'true');
  expect(element).toHaveAttribute('href', '/nowhere');
  expect(element).toHaveTextContent('hello adage');
});
