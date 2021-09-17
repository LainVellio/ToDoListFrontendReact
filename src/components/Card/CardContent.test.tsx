import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors, ETextStyle } from '../../interfaces';
import { CardContent, reorder } from './CardContent';

const data = {
  id: 1,
  todos: [
    {
      id: 1,
      text: 'text',
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      isCompleted: false,
      inArchive: false,
    },
    {
      id: 2,
      text: 'text2',
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      isCompleted: false,
      inArchive: false,
    },
  ],
};

const renderComponent = () => {
  render(<CardContent {...data} />);
  localStorage.setItem('categories', JSON.stringify([data]));
};

describe('CardContent component', () => {
  it('Render CardContent', () => {
    expect(screen.queryByRole('checkbox')).toBeNull();
    renderComponent();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(screen.getByText(/text2/i)).toBeInTheDocument();
  });

  it('Create todo work', () => {
    renderComponent();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    userEvent.click(screen.getByText(/добавить новую задачу/i));
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos,
    ).toHaveLength(3);
  });

  it('should deleteMenu open and close work', () => {
    renderComponent();
    userEvent.hover(screen.getByText('text'));
    userEvent.click(screen.getByTestId('deleteMenu'));
    expect(screen.getByText(/в архив/i)).toBeInTheDocument();
    expect(screen.getByText(/удалить/i)).toBeInTheDocument();
    userEvent.click(screen.getByText('text2'));
    expect(screen.queryByText(/в архив/i)).toBeNull();
    expect(screen.queryByText(/удалить/i)).toBeNull();
  });

  it('Close todo work', () => {
    renderComponent();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    userEvent.hover(screen.getByText('text'));
    userEvent.click(screen.getByTestId('deleteMenu'));
    userEvent.click(screen.getByText(/Удалить/i));
    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos,
    ).toHaveLength(1);
  });

  it('Send todo to archive work', () => {
    renderComponent();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    userEvent.hover(screen.getByText('text'));
    userEvent.click(screen.getByTestId('deleteMenu'));
    userEvent.click(screen.getByText(/в архив/i));
    expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].inArchive,
    ).toBeTruthy();
  });

  it('function reorder work', () => {
    const initialArray = [
      {
        id: 1,
        text: '1',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
      },
      {
        id: 2,
        text: '2',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
      },
      {
        id: 3,
        text: '3',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
      },
    ];
    expect(initialArray[0].id).toEqual(1);
    const newArray = reorder(initialArray, 0, 1);
    expect(newArray[0].id).toEqual(2);
  });
});
