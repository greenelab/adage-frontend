import React from 'react';
import { render } from '@testing-library/react';

import Popup from './';

test('popup component', () => {
  // render
  render(<Popup isOpen={true} />);
  const overlay = document.querySelector('.popup_overlay');
  const content = document.querySelector('.popup_content');
  expect(overlay).not.toBe(null);
  expect(content).not.toBe(null);
  expect(content).toHaveStyle('right: 0; top: 0;');
});

test('popup component', () => {
  // render
  window.innerWidth = 1000;
  render(
    <Popup
      isOpen={true}
      anchorBbox={{ rightAbsolute: 800, bottomAbsolute: 200 }}
    />
  );
  const overlay = document.querySelector('.popup_overlay');
  const content = document.querySelector('.popup_content');
  expect(overlay).not.toBe(null);
  expect(content).not.toBe(null);
  expect(content).toHaveStyle('right: 200px; top: 210px;');
});
