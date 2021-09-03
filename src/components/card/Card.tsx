import { ITodo } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWraper } from '@material-ui/core';

interface CardProps {
  id: number;
  title: string;
  todos: Array<ITodo>;
  closeCategory(categoryId: number): void;
  isEdit?: boolean;
}

export const ToDoCard: React.FC<CardProps> = ({
  id,
  title,
  todos,
  closeCategory,
  isEdit = false,
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
          />
          <CardContent id={id} todos={todos} title={title} />
        </CardContentWraper>
      </Card>
    </div>
  );
};
