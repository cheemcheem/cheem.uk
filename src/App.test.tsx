import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import './test/matchMedia.mock';

test('renders learn react link', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
