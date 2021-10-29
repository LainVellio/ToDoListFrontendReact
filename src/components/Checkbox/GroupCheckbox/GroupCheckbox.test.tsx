import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../../../Context';
import { EColors, ETextStyle } from '../../../interfaces';
import { GroupCheckboxProps, GroupCheckbox } from './GroupCheckbox';
import { items } from '../../MainPage/MainPage.test';

const data: GroupCheckboxProps = {
  categoryId: 1,
  todoId: 1,
};

const renderComponent = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(
    <Provider>
      <GroupCheckbox {...data} />
    </Provider>,
  );
};

const testLocalStorage = () =>
  JSON.parse(localStorage.getItem('categories') || '')[0].todos[0];
const {
  getByRole,
  getByTestId,
  getByText,
  queryByTestId,
  queryByText,
  getAllByRole,
  getAllByTestId,
} = screen;
const { hover, click, clear, type, unhover } = userEvent;

describe('ToDoCheckbox component', () => {
  it('should render ToDoCheckbox', () => {
    renderComponent();
    expect(getByText(/text/i)).toBeInTheDocument();
  });

  it('should checked work', () => {
    renderComponent();
    click(getByRole('checkbox'));
    expect(getAllByRole('checkbox')[0]).toBeChecked();
    expect(testLocalStorage().isCompleted).toBeTruthy();
    expect(getAllByTestId('checkboxWrapper')[0] || '').toHaveClass(
      'label-text__checked',
    );
  });

  it('should edit work', () => {
    renderComponent();
    hover(getByRole('checkbox'));
    click(getByTestId('deleteMenu'));
    expect(getByText(/удалить/i)).toBeInTheDocument();
    click(getByTestId('editCheckbox'));
    expect(queryByText(/удалить/i)).toBeNull();
    clear(getByRole('textbox'));
    type(getByRole('textbox'), 'test');
    click(getByTestId('editCheckbox'));
    expect(getByText(/test/i)).toBeInTheDocument();
    expect(testLocalStorage().text).toBe('test');
    unhover(getByRole('checkbox'));
    expect(queryByTestId('editCheckbox')).toBeNull();
  });

  it('change text style work', () => {
    renderComponent();
    hover(getByRole('checkbox'));
    click(getByTestId('editCheckbox'));
    click(getByText('B'));
    expect(getByText('N')).toBeInTheDocument();
    click(getByTestId('editCheckbox'));
    expect(testLocalStorage().textStyle).toBe(ETextStyle.bold);
    click(getByTestId('editCheckbox'));
    click(getByText('N'));
    expect(getByText('B')).toBeInTheDocument();
    click(getByTestId('editCheckbox'));
    expect(testLocalStorage().textStyle).toBe(ETextStyle.normal);
  });

  it('change text color', () => {
    renderComponent();
    expect(getByTestId('checkbox')).toHaveStyle(`color: ${EColors.black}`);
    expect(testLocalStorage().textColor).toBe(EColors.black);
    hover(getByRole('checkbox'));
    click(getByTestId('editCheckbox'));
    expect(getAllByTestId('circle')).toHaveLength(3);
    click(getAllByTestId('circle')[0]);
    expect(getByTestId('checkbox')).toHaveStyle(`color: ${EColors.red}`);
    click(getByTestId('editCheckbox'));
    expect(testLocalStorage().textColor).toBe(EColors.red);
  });
});
