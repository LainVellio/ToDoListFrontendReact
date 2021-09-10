import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardHeader } from './CardHeader';

const props = {
  title: 'title',
  closeCategory: jest.fn(),
  id: 0,
};

describe('CardHeader component', () => {
  it('Render CardHeader', () => {
    render(<CardHeader {...props} isEdit={false} />);
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByTestId('closeCard')).toBeInTheDocument();
    render(<CardHeader {...props} isEdit={true} />);
    expect(screen.getByTestId('ColorCircles')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('onBlur Input', () => {
    render(<CardHeader {...props} isEdit={true} />);
    screen.getByRole('textbox').blur();
    expect(screen.getByText('title')).toBeInTheDocument();
  });
  it('Change Input', () => {
    render(<CardHeader {...props} isEdit={true} />);
    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByDisplayValue(/test/i)).toBeInTheDocument();
  });
  it('Click EditIcon', () => {
    render(<CardHeader {...props} isEdit={false} />);
    expect(screen.queryByRole('textbox')).toBeNull();
    userEvent.click(screen.getByTestId('editIcon'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
