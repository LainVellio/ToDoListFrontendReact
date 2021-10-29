import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Provider from '../../../Context';
import { EColors } from '../../../interfaces';
import { items } from '../../MainPage/MainPage.test';
import { CardHeader, CardHeaderProps } from './CardHeader';

const data: CardHeaderProps = {
  categoryId: 1,
};

const renderComponent = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(
    <Provider>
      <CardHeader {...data} />
    </Provider>,
  );
};

const {
  getByRole,
  getByTestId,
  getByDisplayValue,
  queryByRole,
  getAllByTestId,
  getByText,
} = screen;
const { click, clear, type } = userEvent;

describe('CardHeader component', () => {
  it('CardHeader render', () => {
    renderComponent();
    expect(getByText(/title/i)).toBeInTheDocument();
  });

  it('Edit mode in header work', () => {
    renderComponent();
    expect(queryByRole('textbox')).toBeNull();
    click(getByTestId('editButton'));
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('Type in InputEdit', () => {
    renderComponent();
    click(getByTestId('editButton'));
    clear(getByRole('textbox'));
    type(getByRole('textbox'), 'Test');
    expect(getByDisplayValue(/test/i)).toBeInTheDocument();
  });

  it('Dynamic styles works', () => {
    renderComponent();
    click(getByTestId('editButton'));
    expect(getByRole('textbox')).toHaveClass('inputCard');
    expect(getByRole('textbox')).toHaveStyle('font-size: 1.25rem');
  });

  it('Change header colors work', () => {
    renderComponent();
    expect(getByTestId('cardHeader')).toHaveStyle(
      `background-color: ${EColors.blue}`,
    );
    click(getByTestId('editButton'));
    click(getAllByTestId('circle')[0]);
    expect(getByTestId('cardHeader')).toHaveStyle(
      `background-color: ${EColors.red}`,
    );
  });
});
