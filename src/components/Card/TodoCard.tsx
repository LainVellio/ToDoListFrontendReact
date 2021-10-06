import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';

export interface CardProps {
  id: number;
  deleteCard(categoryId: number): void;
}

export const TodoCard: React.FC<CardProps> = ({ id, deleteCard }) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader id={id} deleteCard={deleteCard} />
          <CardContent id={id} />
        </CardContentWrapper>
      </Card>
    </div>
  );
};
