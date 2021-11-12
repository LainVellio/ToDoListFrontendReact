import React from 'react';
import { CardContent } from './CardContent/CardContent';
import { CardHeader } from './CardHeader/CardHeader';

import { Card, CardContent as CardContentWrapper } from '@material-ui/core';
import styled from 'styled-components';

export interface CardProps {
  categoryId: number;
}

const CardWrapper = styled.div`
  width: 380px;
`;

export const TodoCard: React.FC<CardProps> = ({ categoryId }) => {
  return (
    <CardWrapper data-testid="card">
      <Card>
        <CardContentWrapper>
          <CardHeader categoryId={categoryId} />
          <CardContent categoryId={categoryId} />
        </CardContentWrapper>
      </Card>
    </CardWrapper>
  );
};
