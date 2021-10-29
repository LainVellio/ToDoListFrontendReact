import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../../../Context';
import { items } from '../../MainPage/MainPage.test';
import { SubCheckboxProps, SubTodoCheckbox } from './SubTodoCheckbox';

const data: SubCheckboxProps = {
  categoryId: 1,
  subTodoId: 1,
  todoId: 1,
};

const renderComponent = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(
    <Provider>
      <SubTodoCheckbox {...data} />
    </Provider>,
  );
};

const testLocalStorage = () =>
  JSON.parse(localStorage.getItem('categories') || '')[0].todos[0].subTodos[0];
const { getByRole, getByTestId, getByText, queryByTestId } = screen;
const { hover, click, clear, type, unhover } = userEvent;

describe('render SubTodoCheckbox component', () => {
  it('should render ToDoCheckbox', () => {
    renderComponent();
    expect(getByText(/text/i)).toBeInTheDocument();
  });

  it('type SubCheckbox work', () => {
    renderComponent();
    hover(getByRole('checkbox'));
    click(getByTestId('editSubCheckbox'));
    clear(getByRole('textbox'));
    type(getByRole('textbox'), 'test');
    type(getByRole('textbox'), '{enter}');
    expect(getByText(/test/i)).toBeInTheDocument();
    expect(testLocalStorage().text).toEqual('test');
  });

  it('checked SubCheckbox work', () => {
    renderComponent();
    expect(getByRole('checkbox')).not.toBeChecked();
    click(getByRole('checkbox'));
    expect(getByRole('checkbox')).toBeChecked();
    expect(testLocalStorage().isCompleted).toBeTruthy();
  });

  it('hover and unhover work', () => {
    renderComponent();
    expect(queryByTestId('editSubCheckbox')).not.toBeInTheDocument();
    hover(getByRole('checkbox'));
    expect(getByTestId('editSubCheckbox')).toBeInTheDocument();
    unhover(getByRole('checkbox'));
    expect(queryByTestId('editSubCheckbox')).not.toBeInTheDocument();
  });
});
