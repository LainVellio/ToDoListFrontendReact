import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../../Context';
import { items } from '../MainPage/MainPage.test';
import { TodoCard, CardProps } from './TodoCard';

const data: CardProps = {
  categoryId: 1,
};

const renderComponent = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(
    <Provider>
      <TodoCard {...data} />
    </Provider>,
  );
};

const {
  getByRole,
  getByTestId,
  getByText,
  queryByRole,
  queryByText,
  getAllByRole,
} = screen;
const { click } = userEvent;

describe('Card component', () => {
  it('Render Card work', () => {
    expect(queryByText(/title/i)).toBeNull();
    renderComponent();
    expect(getByText(/title/i)).toBeInTheDocument();
    expect(getAllByRole('checkbox')[0]).toBeInTheDocument();
    expect(getByText(/text1/i)).toBeInTheDocument();
  });

  it('Switching Edit mode on click outside works', () => {
    renderComponent();
    expect(queryByRole('textbox')).toBeNull();
    click(getByTestId('editButton'));
    expect(getByRole('textbox')).toBeInTheDocument();
    click(getAllByRole('checkbox')[0]);
    expect(queryByRole('textbox')).toBeNull();
  });
});
