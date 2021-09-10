import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const categories = [
  {
    title: '1',
    id: 1,
    todos: [],
  },
];

describe('App component', () => {
  const renderApp = async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: categories }));
    render(<App />);
  };

  it('fetch categories from an API', async () => {
    renderApp();
    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it('ToDoCard title', async () => {
    renderApp();
    const cards = await screen.findAllByTestId('card');
    expect(cards[0]).toHaveTextContent('1');
  });

  it('Create ToDoCard', async () => {
    mockedAxios.post.mockReturnValueOnce(
      Promise.resolve({
        data: { title: '4', id: 4, todos: [] },
      }),
    );
    render(<App />);
    expect(screen.getByText(/Добавить новую категорию/i)).toBeInTheDocument();
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
    userEvent.click(await screen.findByTestId('createCard'));
    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(1);
  });
  it('Close ToDoCard', async () => {
    renderApp();
    expect(await screen.findAllByTestId('card')).toHaveLength(1);
    await act(async () => {
      userEvent.click(await screen.findByTestId('closeCard'));
    });
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
  });
});
