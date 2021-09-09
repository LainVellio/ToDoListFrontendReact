import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('ToDoCard count', async () => {
  render(<App />);
  expect(await screen.findByText(/234234234/i)).toBeInTheDocument();
});
