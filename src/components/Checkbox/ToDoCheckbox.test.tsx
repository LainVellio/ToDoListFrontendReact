import { CheckboxProps, ToDoCheckbox } from './ToDoCheckbox';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors, ETextStyle } from '../../interfaces';

const data: CheckboxProps = {
  id: 1,
  text: 'text',
  textColor: EColors.black,
  textStyle: ETextStyle.normal,
  isCompleted: false,
  inArchive: false,
  categoryId: 1,
  isEdit: false,
  closeTodo: jest.fn(),
  sendInArchive: jest.fn(),
};

const items = [
  {
    title: 'title',
    id: 1,
    colorHeader: EColors.blue,
    todos: [
      {
        text: 'text',
        id: 1,
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: true,
      },
    ],
  },
];

const renderComponent = () => {
  localStorage.setItem('categories', JSON.stringify(items));
  render(<ToDoCheckbox {...data} />);
};

describe('ToDoCheckbox component', () => {
  it('should render ToDoCheckbox', () => {
    renderComponent();
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });

  it('should checked work', () => {
    renderComponent();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].isCompleted,
    ).toBeTruthy();
    expect(screen.getByTestId('checkboxWrapper')).toHaveClass(
      'label-text__checked',
    );
  });

  it('should edit work', () => {
    renderComponent();
    userEvent.hover(screen.getByRole('checkbox'));
    userEvent.click(screen.getByTestId('deleteMenu'));
    expect(screen.getByText(/удалить/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('editCheckbox'));
    expect(screen.queryByText(/удалить/i)).toBeNull();
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), 'test');
    userEvent.click(screen.getByTestId('editCheckbox'));
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].text,
    ).toBe('test');
    userEvent.unhover(screen.getByRole('checkbox'));
    expect(screen.queryByTestId('editCheckbox')).toBeNull();
  });

  it('change text style work', () => {
    renderComponent();
    userEvent.hover(screen.getByRole('checkbox'));
    userEvent.click(screen.getByTestId('editCheckbox'));
    userEvent.click(screen.getByText('B'));
    expect(screen.getByText('N')).toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].textStyle,
    ).toBe(ETextStyle.bold);
    userEvent.click(screen.getByText('N'));
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].textStyle,
    ).toBe(ETextStyle.normal);
  });

  it('change text color', () => {
    renderComponent();
    expect(screen.getByTestId('checkbox')).toHaveStyle(
      `color: ${EColors.black}`,
    );
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].textColor,
    ).toBe(EColors.black);
    userEvent.hover(screen.getByRole('checkbox'));
    userEvent.click(screen.getByTestId('editCheckbox'));
    expect(screen.getAllByTestId('circle')).toHaveLength(3);
    userEvent.click(screen.getAllByTestId('circle')[0]);
    expect(screen.getByTestId('checkbox')).toHaveStyle(`color: ${EColors.red}`);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].textColor,
    ).toBe(EColors.red);
  });
});
