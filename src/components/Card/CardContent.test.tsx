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
  ],
};

describe('CardContent component', () => {
  it('Render CardContent', () => {
    expect(screen.queryByRole('checkbox')).toBeNull();
    render(<CardContent {...data} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });

  it('Create todo work', () => {
    render(<CardContent {...data} />);
    localStorage.setItem('categories', JSON.stringify([data]));
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    userEvent.click(screen.getByText(/добавить новую задачу/i));
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos,
    ).toHaveLength(2);
  });

  it('Close todo work', () => {
    render(<CardContent {...data} />);
    localStorage.setItem('categories', JSON.stringify([data]));
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    userEvent.hover(screen.getByText('text'));
    userEvent.click(screen.getByTestId('deleteMenu'));
    userEvent.click(screen.getByText(/Удалить/i));
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos,
    ).toHaveLength(0);
  });

  it('Send todo to archive work', () => {
    render(<CardContent {...data} />);
    localStorage.setItem('categories', JSON.stringify([data]));
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    userEvent.hover(screen.getByText('text'));
    userEvent.click(screen.getByTestId('deleteMenu'));
    userEvent.click(screen.getByText(/в архив/i));
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
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
