import React from 'react';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

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

it('ToDoCard count', async () => {
  // await screen.findAllByTestId('toDoCard');
  // expect(screen.getByTestId('toDoCard')).toBeNull();
  act(() => {
    render(<App />);
  });
  expect(await screen.findByText(/title/i)).toBeInTheDocument();
});
