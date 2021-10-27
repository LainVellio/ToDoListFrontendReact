import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';
import { ICategory } from '../../interfaces';

export interface CardProps {
  category: ICategory;
}

export const TodoCard: React.FC<CardProps> = ({ category }) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader category={category} />
          <CardContent category={category} />
        </CardContentWrapper>
      </Card>
    </div>
  );
};
