import { MainPage } from './MainPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors } from '../../interfaces';

const data = [
  {
    title: 'title1',
    id: 1,
    colorHeader: EColors.blue,
    todos: [],
  },
  {
    title: 'title2',
    id: 2,
    colorHeader: EColors.blue,
    todos: [],
  },
];

const renderPage = () => {
  localStorage.setItem('categories', JSON.stringify(data));
  render(<MainPage />);
};

describe('MainPage component', () => {
  it('should render MainPage', () => {
    renderPage();
    expect(screen.getByText(/title1/i)).toBeInTheDocument();
    expect(screen.getByText(/title2/i)).toBeInTheDocument();
  });

  it('should createCard work', () => {
    renderPage();
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    userEvent.click(screen.getByText(/добавить новую категорию/i));
    expect(screen.getAllByTestId('card')).toHaveLength(3);
    expect(JSON.parse(localStorage.getItem('categories')!)).toHaveLength(3);
  });

  it('should deleteCard work', () => {
    renderPage();
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    userEvent.click(screen.getAllByTestId('deleteButton')[0]);
    expect(screen.getAllByTestId('card')).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('categories')!)).toHaveLength(1);
  });
});
