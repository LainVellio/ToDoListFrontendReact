import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from '../../../Context';
import { EColors, ETextStyle } from '../../../interfaces';
import { items } from '../../MainPage/MainPage.test';
import { SubCheckboxProps, SubTodoCheckbox } from './SubTodoCheckbox';
import userEvent from '@testing-library/user-event';

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

describe('render SubTodoCheckbox component', () => {
  it('should render ToDoCheckbox', () => {
    renderComponent();
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
  it('delete empty checkbox work', () => {
    renderComponent();
    //  userEvent.hover(screen.by)
  });
});
