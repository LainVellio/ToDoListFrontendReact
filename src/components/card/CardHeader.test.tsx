import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors } from '../../interfaces';
import { CardHeader, CardHeaderProps } from './CardHeader';

const closeCard = jest.fn();

const data: CardHeaderProps = {
  isEdit: true,
  title: '',
  id: 1,
  colorHeader: EColors.blue,
  closeCard: closeCard,
};

describe('CardHeader component', () => {
  it('CardHeader render', () => {
    render(<CardHeader {...data} />);
    screen.debug();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  //   it('CardHeader snapshot', () => {
  //     const cardHeader = render(<CardHeader {...data} />);
  //     expect(cardHeader).toMatchSnapshot();
  //   });

  it('closeCard work', () => {
    render(<CardHeader {...data} />);
    userEvent.click(screen.getByRole('button'));
    expect(closeCard).toHaveBeenCalledTimes(1);
  });

  it('Type in InputEdit', () => {
    render(<CardHeader {...data} />);
    userEvent.type(screen.getByRole('textbox'), 'Test');
    expect(screen.queryByDisplayValue('Test')).toBeInTheDocument();
  });

  it('dinamyc styles works', () => {
    render(<CardHeader {...data} />);
    expect(screen.getByRole('textbox')).toHaveClass('inputCard');
    expect(screen.getByRole('textbox')).toHaveStyle('font-size: 1.25rem');
  });
});
