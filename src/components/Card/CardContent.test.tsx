import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors, ETextStyle, IGroupTodo } from '../../interfaces';
import { CardContent, reorder } from './CardContent';
import localStorageApi from '../../api/localStorageAPI';

const data = {
  id: 1,
  editCard: jest.fn(),
  todos: [
    {
      id: 1,
      text: 'text',
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      isCompleted: false,
      inArchive: false,
      subTasks: [],
    },
    {
      id: 2,
      text: 'text2',
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      isCompleted: false,
      inArchive: false,
      subTasks: [],
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

  it('close edit menu on click outside work', () => {
    renderComponent();
    expect(screen.queryByTestId('editMenu')).toBeNull();
    userEvent.hover(screen.getAllByRole('checkbox')[0]);
    userEvent.click(screen.getByTestId('editCheckbox'));
    expect(screen.getByTestId('editMenu')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('checkbox')[1]);
    expect(screen.queryByTestId('editMenu')).toBeNull();
  });

  it('close edit menu when press Enter work', () => {
    renderComponent();
    expect(screen.queryByTestId('editMenu')).toBeNull();
    userEvent.hover(screen.getAllByRole('checkbox')[0]);
    userEvent.click(screen.getByTestId('editCheckbox'));
    expect(screen.getByTestId('editMenu')).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'), '{enter}');
    expect(screen.queryByTestId('editMenu')).toBeNull();
  });

  it('delete empty checkbox work', () => {
    renderComponent();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
    userEvent.hover(screen.getAllByRole('checkbox')[0]);
    userEvent.click(screen.getByTestId('editCheckbox'));
    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), '{enter}');
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
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
        subTasks: [],
      },
      {
        id: 2,
        text: '2',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
        subTasks: [],
      },
      {
        id: 3,
        text: '3',
        isCompleted: false,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: false,
        subTasks: [],
      },
    ];
    expect(initialArray[0].id).toEqual(1);
    const newArray = reorder(initialArray, 0, 1);
    expect(newArray[0].id).toEqual(2);
    localStorageApi.patchCategory<IGroupTodo[]>(1, 'todos', newArray);
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].id,
    ).toEqual(2);
  });
});
