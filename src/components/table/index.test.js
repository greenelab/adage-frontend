import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import Table from './';

test('table component', () => {
  // render
  const { container } = render(
    <Table
      data={[
        { fruit: 'apple', age: '23', name: 'James' },
        { fruit: 'pear', age: '44', name: 'Anna' },
        { fruit: 'banana', age: '38', name: 'Cara' }
      ]}
      columns={[
        { name: 'Fruit Column', key: 'fruit' },
        { name: 'Age Column', key: 'age' },
        {
          name: 'Name Column',
          key: 'name',
          render: () => 'render this instead of name'
        }
      ]}
    />
  );

  mockAllIsIntersecting(true);

  const element = container.firstChild;
  const ageCol = () => container.querySelector('.th:nth-of-type(2)');
  const firstRow = () => container.querySelectorAll('.tbody .tr')[0];
  const secondRow = () => container.querySelectorAll('.tbody .tr')[1];
  const thirdRow = () => container.querySelectorAll('.tbody .tr')[2];

  // basic
  expect(ageCol()).toBeInTheDocument();
  expect(element).toHaveTextContent(/fruit column/i);
  expect(element).toHaveTextContent(/age column/i);
  expect(element).toHaveTextContent(/name column/i);
  expect(element).toHaveTextContent(/apple/i);
  expect(element).toHaveTextContent(/pear/i);
  expect(element).toHaveTextContent(/banana/i);
  expect(element).not.toHaveTextContent(/james/i);
  expect(element).not.toHaveTextContent(/anna/i);
  expect(element).not.toHaveTextContent(/cara/i);

  // sort
  expect(firstRow()).toHaveTextContent('23');
  expect(secondRow()).toHaveTextContent('44');
  expect(thirdRow()).toHaveTextContent('38');
  fireEvent.click(ageCol());
  expect(firstRow()).toHaveTextContent('23');
  expect(secondRow()).toHaveTextContent('38');
  expect(thirdRow()).toHaveTextContent('44');
  fireEvent.click(ageCol());
  expect(firstRow()).toHaveTextContent('44');
  expect(secondRow()).toHaveTextContent('38');
  expect(thirdRow()).toHaveTextContent('23');
});
