import { ICategory } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';

export interface CardProps extends ICategory {
  closeCard(categoryId: number): void;
  editCard(key: string, value: unknown): void;
}

export const TodoCard: React.FC<CardProps> = ({
  id,
  title,
  todos,
  colorHeader,
  closeCard,
  editCard,
}) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader
            id={id}
            title={title}
            colorHeader={colorHeader}
            closeCard={closeCard}
            editCard={editCard}
          />
          <CardContent id={id} todos={todos} editCard={editCard} />
        </CardContentWrapper>
      </Card>
    </div>
  );
};
