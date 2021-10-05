import { IGroupTodo } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';

export interface CardProps {
  id: number;
  todos: IGroupTodo[];
  closeCard(categoryId: number): void;
  editCard(key: string, value: unknown): void;
}

export const TodoCard: React.FC<CardProps> = ({
  id,
  todos,
  closeCard,
  editCard,
}) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader id={id} closeCard={closeCard} />
          <CardContent id={id} todos={todos} editCard={editCard} />
        </CardContentWrapper>
      </Card>
    </div>
  );
};
