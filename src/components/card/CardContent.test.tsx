import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { CardContent, reorder } from './CardContent';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const props = {
  todos: [{ id: 1, text: 'test', isCompleted: false }],
  title: 'title',
};

describe('CardContent component', () => {
  it('render CardContent', () => {
    render(<CardContent {...props} />);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByTestId('droppable')).toBeInTheDocument();
    expect(screen.getByText(/Добавить новую задачу/i)).toBeInTheDocument();
  });

  it('Add new ToDo', async () => {
    mockedAxios.post.mockReturnValueOnce(
      Promise.resolve({
        data: { todos: [{ title: 'title', id: 2, text: 'test' }] },
      }),
    );
    render(<CardContent {...props} />);
    expect(screen.queryAllByText(/test/i)).toHaveLength(1);
    await act(async () => {
      userEvent.click(await screen.findByTestId('addNewTodo'));
    });
    screen.getByRole('textbox').blur();
    expect(screen.queryAllByText(/test/i)).toHaveLength(2);
  });

  it('Close ToDo', async () => {
    render(<CardContent {...props} />);
    expect(screen.queryAllByText(/test/i)).toHaveLength(1);
    userEvent.hover(screen.getByText(/test/i));
    await act(async () => {
      userEvent.click(await screen.findByTestId('closeTodo'));
    });
    expect(screen.queryAllByText(/test/i)).toHaveLength(0);
  });

  it('function reorder', () => {
    const initialArray = [
      { id: 1, text: '1', isCompleted: false },
      { id: 2, text: '2', isCompleted: false },
      { id: 3, text: '3', isCompleted: false },
    ];
    expect(initialArray[0].id).toEqual(1);
    const newArray = reorder(initialArray, 0, 1);
    expect(newArray[0].id).toEqual(2);
  });
});
