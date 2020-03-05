import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

import Section from './';

test('section component', () => {
  // render
  const Children = () => <div id='children' />;
  const { container } = render(
    <Section header='hello adage'>
      <Children />
    </Section>
  );
  const header = () => container.querySelector('.section_header');
  const section = () => container.querySelector('section');

  // basic
  expect(header()).toHaveTextContent('hello adage');
  expect(section()).toHaveAttribute('data-expanded', 'true');
  fireEvent.click(header());
  expect(section()).toHaveAttribute('data-expanded', 'false');
});
