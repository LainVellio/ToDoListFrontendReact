import { render, screen } from '@testing-library/react';
import { CreateTodoButton, CreateTodoButtonProps } from './CreateTodoButton';

const createTodo = jest.fn();
const data: CreateTodoButtonProps = {
  createTodo: createTodo,
};

describe('CreateTodoButton component', () => {
  it('CreateTodoButton render', () => {
    expect(screen.queryByText(/добавить новую задачу/i)).toBeNull();
    render(<CreateTodoButton {...data} />);
    expect(screen.getByText(/добавить новую задачу/i)).toBeInTheDocument();
  });
});
