import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardContent } from './CardContent';

const props = {
  todos: [{ id: 1, text: 'test', isCompleted: false }],
  title: 'title',
};

describe('CardContent component', () => {
  it('render CardContent', () => {});
});
