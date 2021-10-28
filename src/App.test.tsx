import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
  it('render header', () => {
    render(<App />);
    const header = screen.getByText(/to do list/i);
    expect(header).toBeInTheDocument();
  });

  it('render archive page', () => {
    const { getByText } = render(<App />);
    userEvent.click(getByText(/archive/i));
    expect(getByText(/archive/i)).toBeInTheDocument();
    expect(getByText(/back/i)).toBeInTheDocument();
  });

  it('render main page', () => {
    const { getByText } = render(<App />);
    userEvent.click(getByText(/to do list/i));
    expect(getByText(/добавить новую категорию/i)).toBeInTheDocument();
  });

  // test('App snapshot', () => {
  //   const { asFragment } = render(<App />);
  //   expect(asFragment(<App />)).toMatchSnapshot();
  // });
});
