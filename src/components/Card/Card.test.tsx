import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors, ETextStyle } from '../../interfaces';
import { ToDoCard, CardProps } from './Card';

const closeCard = jest.fn();
const data: CardProps = {
  id: 1,
  title: 'title',
  todos: [
    {
      id: 1,
      text: 'text',
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      isCompleted: false,
      inArchive: false,
    },
  ],
  colorHeader: EColors.blue,
  closeCard: closeCard,
};

describe('Card component', () => {
  it('Render Card work', () => {
    expect(screen.queryByText(/title/i)).toBeNull();
    render(<ToDoCard {...data} />);
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });

  it('Switching Edit mode on click outside works', () => {
    render(<ToDoCard {...data} />);
    expect(screen.queryByRole('textbox')).toBeNull();
    userEvent.click(screen.getByTestId('editButton'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
