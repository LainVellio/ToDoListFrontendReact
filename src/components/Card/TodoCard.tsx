import React from 'react';
import { CardContent } from './CardContent/CardContent';
import { CardHeader } from './CardHeader/CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';

export interface CardProps {
  categoryId: number;
}

export const TodoCard: React.FC<CardProps> = ({ categoryId }) => {
  return (
    <div data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader categoryId={categoryId} />
          <CardContent categoryId={categoryId} />
        </CardContentWrapper>
      </Card>
    </div>
  );
};
