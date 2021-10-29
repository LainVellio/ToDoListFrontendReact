import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EColors, ETextStyle, IGroupTodo } from '../../../interfaces';
import { CardContent, CardContentProps, reorder } from './CardContent';
import { items } from '../../MainPage/MainPage.test';
import Provider from '../../../Context';

const data: CardContentProps = {
  categoryId: 1,
};

const renderComponent = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(
    <Provider>
      <CardContent {...data} />
    </Provider>,
  );
};

const testLocalStorage = () =>
  JSON.parse(localStorage.getItem('categories') || '')[0].todos;
const {
  queryAllByRole,
  getByTestId,
  getByText,
  queryByTestId,
  queryByText,
  getAllByRole,
  getByRole,
} = screen;
const { hover, click, clear, type } = userEvent;

describe('CardContent component', () => {
  it('Render CardContent', () => {
    renderComponent();
    expect(getAllByRole('checkbox')).toHaveLength(2);
    expect(getByText(/text1/i)).toBeInTheDocument();
  });

  it('Create todo work', () => {
    renderComponent();
    expect(getAllByRole('checkbox')).toHaveLength(2);
    click(getByText(/добавить новую задачу/i));
    expect(getAllByRole('checkbox')).toHaveLength(3);
    expect(testLocalStorage()).toHaveLength(3);
  });

  it('should deleteMenu open and close work', () => {
    renderComponent();
    hover(getByText(/text1/i));
    click(getByTestId('openDeleteMenu'));
    expect(getByText(/в архив/i)).toBeInTheDocument();
    expect(getByText(/удалить/i)).toBeInTheDocument();
    click(getByTestId('openDeleteMenu'));
    expect(queryByText(/в архив/i)).toBeNull();
    expect(queryByText(/удалить/i)).toBeNull();
  });

  it('Delete todo work', () => {
    renderComponent();
    expect(getAllByRole('checkbox')).toHaveLength(2);
    hover(getByText(/text1/i));
    click(getByTestId('openDeleteMenu'));
    click(getByText(/Удалить/i));
    expect(queryAllByRole('checkbox')).toHaveLength(1);
    expect(testLocalStorage()).toHaveLength(1);
  });

  it('Send todo to archive work', () => {
    renderComponent();
    expect(getAllByRole('checkbox')).toHaveLength(2);
    hover(getByText(/text1/i));
    click(getByTestId('openDeleteMenu'));
    click(getByText(/в архив/i));
    expect(queryAllByRole('checkbox')).toHaveLength(1);
    expect(testLocalStorage()[0].inArchive).toBeTruthy();
  });

  it('close edit menu on click outside work', () => {
    renderComponent();
    expect(queryByTestId('editMenu')).toBeNull();
    hover(getAllByRole('checkbox')[0]);
    click(getByTestId('editCheckbox'));
    expect(getByTestId('editMenu')).toBeInTheDocument();
    click(getAllByRole('checkbox')[1]);
    expect(queryByTestId('editMenu')).toBeNull();
  });

  it('close edit menu when press Enter work', () => {
    renderComponent();
    expect(queryByTestId('editMenu')).toBeNull();
    hover(getAllByRole('checkbox')[0]);
    click(getByTestId('editCheckbox'));
    expect(getByTestId('editMenu')).toBeInTheDocument();
    type(getByRole('textbox'), '{enter}');
    expect(queryByTestId('editMenu')).toBeNull();
  });

  it('delete empty checkbox work', () => {
    renderComponent();
    expect(getAllByRole('checkbox')).toHaveLength(2);
    hover(getAllByRole('checkbox')[0]);
    click(getByTestId('editCheckbox'));
    clear(getByRole('textbox'));
    type(getByRole('textbox'), '{enter}');
    expect(getAllByRole('checkbox')).toHaveLength(1);
  });

  it('function reorder work', () => {
    const initialArray: IGroupTodo[] = [
      {
        id: 1,
        text: '1',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
        subTodos: [],
        isOpen: false,
        timeCompleted: null,
      },
      {
        id: 2,
        text: '2',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
        subTodos: [],
        isOpen: false,
        timeCompleted: null,
      },
      {
        id: 3,
        text: '3',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
        subTodos: [],
        isOpen: false,
        timeCompleted: null,
      },
    ];
    expect(initialArray[0].id).toEqual(1);
    const newArray = reorder(initialArray, 0, 1);
    expect(newArray[0].id).toEqual(2);
  });
});
