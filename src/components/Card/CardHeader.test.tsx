import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors } from '../../interfaces';
import { CardHeader, CardHeaderProps } from './CardHeader';

const closeCard = jest.fn();
const data: CardHeaderProps = {
  isEdit: false,
  title: 'title',
  id: 1,
  colorHeader: EColors.blue,
  closeCard: closeCard,
};

describe('CardHeader component', () => {
  it('CardHeader render', () => {
    render(<CardHeader {...data} />);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  it('Edit mode in header work', () => {
    render(<CardHeader {...data} />);
    expect(screen.queryByRole('textbox')).toBeNull();
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Type in InputEdit', () => {
    render(<CardHeader {...data} />);
    userEvent.click(screen.getByTestId('editButton'));
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'Test');
    expect(screen.queryByDisplayValue(/test/i)).toBeInTheDocument();
  });

  it('Dynamic styles works', () => {
    render(<CardHeader {...data} />);
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toHaveClass('inputCard');
    expect(screen.getByRole('textbox')).toHaveStyle('font-size: 1.25rem');
  });

  it('Close card works', () => {
    render(<CardHeader {...data} />);
    expect(screen.getByText('title')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('deleteButton'));
    expect(screen.queryByText('textbox')).toBeNull();
  });

  it('Change header colors work', () => {
    render(<CardHeader {...data} />);
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
