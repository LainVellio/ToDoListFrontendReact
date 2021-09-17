import { ICategory } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';

export interface CardProps extends ICategory {
  closeCard(categoryId: number): void;
  isEdit?: boolean;
}

export const ToDoCard: React.FC<CardProps> = ({
  id,
  title,
  todos,
  isEdit = false,
  colorHeader,
  closeCard,
}) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader
            title={title}
            isEdit={isEdit}
            closeCard={closeCard}
            id={id}
            colorHeader={colorHeader}
          />
          <CardContent id={id} todos={todos} />
        </CardContentWrapper>
      </Card>
    </div>
  );
};
