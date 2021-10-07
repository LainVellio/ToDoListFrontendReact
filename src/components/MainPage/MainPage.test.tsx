import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { MainPage } from './MainPage';
import { EColors, ETextStyle, ICategory } from '../../interfaces';
import Provider from '../../Context';

export const items: ICategory[] = [
  {
    title: 'title1',
    id: 1,
    colorHeader: EColors.blue,
    todos: [
      {
        id: 1,
        text: 'text1',
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        isCompleted: false,
        timeCompleted: null,
        isOpen: false,
        inArchive: false,
        subTodos: [
          {
            id: 1,
            text: 'text',
            textColor: EColors.black,
            textStyle: ETextStyle.normal,
            isCompleted: false,
          },
        ],
      },
      {
        id: 2,
        text: 'text2',
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        isCompleted: false,
        timeCompleted: null,
        isOpen: false,
        inArchive: false,
        subTodos: [
          {
            id: 1,
            text: 'text',
            textColor: EColors.black,
            textStyle: ETextStyle.normal,
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    title: 'title2',
    id: 2,
    colorHeader: EColors.blue,
    todos: [
      {
        id: 1,
        text: 'text1',
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        isCompleted: false,
        timeCompleted: null,
        isOpen: false,
        inArchive: false,
        subTodos: [
          {
            id: 1,
            text: 'text',
            textColor: EColors.black,
            textStyle: ETextStyle.normal,
            isCompleted: false,
          },
        ],
      },
    ],
  },
];

const renderPage = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(
    <Provider>
      <MainPage />
    </Provider>,
  );
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
