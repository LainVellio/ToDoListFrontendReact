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

describe('CardHeader component', () => {
  it('CardHeader render', () => {
    renderComponent();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  it('Edit mode in header work', () => {
    renderComponent();
    expect(screen.queryByRole('textbox')).toBeNull();
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Type in InputEdit', () => {
    renderComponent();
    userEvent.click(screen.getByTestId('editButton'));
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'Test');
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
  });

  it('Dynamic styles works', () => {
    renderComponent();
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toHaveClass('inputCard');
    expect(screen.getByRole('textbox')).toHaveStyle('font-size: 1.25rem');
  });

  it('Change header colors work', () => {
    renderComponent();
    expect(screen.getByTestId('cardHeader')).toHaveStyle(
      `background-color: ${EColors.blue}`,
    );
    userEvent.click(screen.getByTestId('editButton'));
    userEvent.click(screen.getAllByTestId('circle')[0]);
    expect(screen.getByTestId('cardHeader')).toHaveStyle(
      `background-color: ${EColors.red}`,
    );
  });
});
