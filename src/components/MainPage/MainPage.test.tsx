import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { MainPage } from './MainPage';
import {
  EColors,
  ENumberingType,
  ETextStyle,
  ICategory,
} from '../../interfaces';
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
        numberingType: ENumberingType.void,
        subTodos: [
          {
            id: 1,
            text: 'text',
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
        numberingType: ENumberingType.void,
        subTodos: [
          {
            id: 1,
            text: 'text',
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
        numberingType: ENumberingType.void,
        subTodos: [
          {
            id: 1,
            text: 'text',
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
const testLocalStorage = () =>
  JSON.parse(localStorage.getItem('categories') || '');
const { getByText, getAllByTestId, getByRole } = screen;
const { click, clear, type } = userEvent;

describe('MainPage component', () => {
  it('should render MainPage', () => {
    renderPage();
    expect(getByText(/title1/i)).toBeInTheDocument();
    expect(getByText(/title2/i)).toBeInTheDocument();
  });

  it('should createCard work', () => {
    renderPage();
    expect(getAllByTestId('card')).toHaveLength(2);
    click(getByText(/добавить новую категорию/i));
    expect(getAllByTestId('card')).toHaveLength(3);
    expect(testLocalStorage()).toHaveLength(3);
  });

  it('should deleteCard work', () => {
    renderPage();
    expect(getAllByTestId('card')).toHaveLength(2);
    click(getAllByTestId('deleteButton')[0]);
    expect(getAllByTestId('card')).toHaveLength(1);
    expect(testLocalStorage()).toHaveLength(1);
  });

  it('Delete card with empty title work', () => {
    renderPage();
    expect(getAllByTestId('card')).toHaveLength(2);
    click(getAllByTestId('editButton')[0]);
    clear(getByRole('textbox'));
    type(getByRole('textbox'), '{enter}');
    expect(getAllByTestId('card')).toHaveLength(1);
  });
});
