import { ICategory } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWraper } from '@material-ui/core';

interface CardProps extends ICategory {
  closeCard(categoryId: number): void;
  isEdit?: boolean;
}

export const ToDoCard: React.FC<CardProps> = ({
  id,
  title,
  todos,
  closeCard,
  isEdit = false,
  colorHeader,
}) => {
  return (
    <div>
      <Card>
        <CardContentWraper>
          <CardHeader
            title={title}
            isEdit={isEdit}
            closeCard={closeCard}
            id={id}
            colorHeader={colorHeader}
          />
          <CardContent id={id} todos={todos} />
        </CardContentWraper>
      </Card>
    </div>
  );
};
