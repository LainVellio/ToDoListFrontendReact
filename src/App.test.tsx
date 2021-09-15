import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders button add new category', () => {
    render(<App />);
    const linkElement = screen.getByText(/Добавить новую категорию/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders button add new category with screen', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Добавить новую категорию/i);
    expect(linkElement).toBeInTheDocument();
  });
  // test('App snapshot', () => {
  //   const { asFragment } = render(<App />);
  //   expect(asFragment(<App />)).toMatchSnapshot();
  // });
});
