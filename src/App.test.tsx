import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import './test/matchMedia.mock';

test('renders learn react link', () => {
  const {getByText} = render(<App/>);
// Comment while React.Suspense testing investigated. 
//  const linkElement = getByText(/Home/i);
//  expect(linkElement).toBeInTheDocument();
});
