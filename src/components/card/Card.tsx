import { ICategory } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWraper } from '@material-ui/core';

interface CardProps extends ICategory {
  closeCategory(categoryId: number): void;
  isEdit?: boolean;
}

export const ToDoCard: React.FC<CardProps> = ({
  id,
  title,
  todos,
  closeCategory,
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
            closeCategory={closeCategory}
            id={id}
            colorHeader={colorHeader}
          />
          <CardContent id={id} todos={todos} title={title} />
        </CardContentWraper>
      </Card>
    </div>
  );
};
