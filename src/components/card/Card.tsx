import { ITodo } from '../../interfaces';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWraper } from '@material-ui/core';

interface CardProps {
  id: number;
  label: string;
  title: string;
  todos: Array<ITodo>;
  closeCategory(categoryId: number): void;
  isEdit?: boolean;
}

export const ToDoCard: React.FC<CardProps> = ({
  id,
  title,
  todos,
  label,
  closeCategory,
  isEdit = false,
}) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWraper>
          <CardHeader
            title={title}
            isEdit={isEdit}
            closeCategory={closeCategory}
            id={id}
          />
          <CardContent todos={todos} title={title} />
        </CardContentWraper>
      </Card>
    </div>
  );
};
