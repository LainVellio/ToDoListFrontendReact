import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Provider from '../Context';
import { ArchivePage } from './ArchivePage';
import { EColors, ETextStyle, ICategory } from '../interfaces';

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
        timeCompleted: Date.now(),
        isOpen: false,
        inArchive: true,
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
        text: 'text2',
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        isCompleted: false,
        timeCompleted: null,
        isOpen: false,
        inArchive: true,
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
      <ArchivePage />
    </Provider>,
  );
};

const testLocalStorage = () =>
  JSON.parse(localStorage.getItem('categories') || '')[0].todos;
const { getByTestId, getByText, queryByTestId, queryByText, getAllByTestId } =
  screen;
const { hover, click, unhover } = userEvent;

describe('ArchivePage component', () => {
  it('should render the Archive Page', () => {
    renderPage();
    expect(getByText(/title1/i)).toBeInTheDocument();
    expect(getByText(/archive/i)).toBeInTheDocument();
    expect(getByText(/text1/i)).toBeInTheDocument();
  });

  it('should backTodo work', () => {
    renderPage();
    expect(getByText(/text1/i)).toBeInTheDocument();
    hover(getByText(/text1/i));
    click(getAllByTestId('backTodoToMainPage')[0]);
    expect(queryByText(/text1/i)).toBeNull();
    expect(testLocalStorage()[0].inArchive).toBeFalsy();
  });

  it('should deleteTodo work', () => {
    renderPage();
    expect(screen.getByText(/text1/i)).toBeInTheDocument();
    expect(testLocalStorage()).toHaveLength(1);
    hover(getByText(/text1/i));
    click(getAllByTestId('deleteArchiveTodo')[0]);
    expect(queryByText(/text1/i)).toBeNull();
    expect(testLocalStorage()).toHaveLength(0);
  });

  it('should focus on Todo work', () => {
    renderPage();
    hover(getByText(/text1/i));
    expect(getByTestId('backTodoToMainPage')).toBeInTheDocument();
    expect(getByTestId('deleteArchiveTodo')).toBeInTheDocument();
    unhover(getByText(/text1/i));
    expect(queryByTestId('backTodoToMainPage')).toBeNull();
    expect(queryByTestId('deleteArchiveTodo')).toBeNull();
  });
  it('complete data work', () => {
    renderPage();
    expect(getByText(/несколько секунд назад/i)).toBeInTheDocument();
    expect(getByText(/не выполнено/i)).toBeInTheDocument();
  });
});
