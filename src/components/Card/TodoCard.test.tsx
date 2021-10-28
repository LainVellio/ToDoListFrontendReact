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

describe('Card component', () => {
  it('Render Card work', () => {
    expect(screen.queryByText(/title/i)).toBeNull();
    renderComponent();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();
    expect(screen.getByText(/text1/i)).toBeInTheDocument();
  });

  it('Switching Edit mode on click outside works', () => {
    renderComponent();
    expect(screen.queryByRole('textbox')).toBeNull();
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('Close Edit mode on press Enter works', () => {
    renderComponent();
    expect(screen.queryByRole('textbox')).toBeNull();
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), '{enter}');
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
