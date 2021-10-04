import { ArchivePage } from './ArchivePage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EColors, ETextStyle } from '../interfaces';

const data = [
  {
    title: 'title1',
    id: 1,
    colorHeader: EColors.blue,
    todos: [
      {
        text: 'text1',
        id: 1,
        isCompleted: true,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: true,
        subTasks: [],
      },
      {
        text: 'text2',
        id: 2,
        isCompleted: true,
        textColor: EColors.black,
        textStyle: ETextStyle.normal,
        inArchive: true,
        subTasks: [],
      },
    ],
  },
];

const renderPage = () => {
  localStorage.setItem('categories', JSON.stringify(data));
  render(<ArchivePage />);
};

describe('ArchivePage component', () => {
  it('should render the Archive Page', () => {
    renderPage();
    expect(screen.getByText(/title1/i)).toBeInTheDocument();
    expect(screen.getByText(/archive/i)).toBeInTheDocument();
    expect(screen.getByText(/text1/i)).toBeInTheDocument();
  });

  it('should backTodo work', () => {
    renderPage();
    expect(screen.getByText(/text1/i)).toBeInTheDocument();
    userEvent.hover(screen.getByText(/text1/i));
    userEvent.click(screen.getAllByTestId('backTodoToMainPage')[0]);
    expect(screen.queryByText(/text1/i)).toBeNull();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos[0].inArchive,
    ).toBeFalsy();
  });

  it('should deleteTodo work', () => {
    renderPage();
    expect(screen.getByText(/text1/i)).toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos,
    ).toHaveLength(2);
    userEvent.hover(screen.getByText(/text1/i));
    userEvent.click(screen.getAllByTestId('deleteArchiveTodo')[0]);
    expect(screen.queryByText(/text1/i)).toBeNull();
    expect(
      JSON.parse(localStorage.getItem('categories')!)[0].todos,
    ).toHaveLength(1);
  });

  it('should focus on Todo work', () => {
    renderPage();
    userEvent.hover(screen.getByText(/text1/i));
    expect(screen.getByTestId('backTodoToMainPage')).toBeInTheDocument();
    expect(screen.getByTestId('deleteArchiveTodo')).toBeInTheDocument();
    userEvent.unhover(screen.getByText(/text1/i));
    expect(screen.queryByTestId('backTodoToMainPage')).toBeNull();
    expect(screen.queryByTestId('deleteArchiveTodo')).toBeNull();
  });
});
