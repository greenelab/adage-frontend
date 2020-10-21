import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import Input from './';

test('input component', () => {
  // render
  const { container } = render(<Input className='test_class' multi />);
  const element = container.firstChild;
  const input = () => element.querySelector('input');
  const clearButton = () =>
    element.querySelector('.input_button:nth-of-type(2)');

  // basic
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('test_class');

  // focus/blur
  fireEvent.focus(input());
  expect(element).toHaveAttribute('data-focused', 'true');
  fireEvent.blur(input());
  expect(element).toHaveAttribute('data-focused', 'false');

  // type and clear
  fireEvent.input(input(), { target: { value: 'hello adage' } });
  expect(input().value).toBe('hello adage');
  fireEvent.click(clearButton());
  expect(input().value).toBe('');
});
