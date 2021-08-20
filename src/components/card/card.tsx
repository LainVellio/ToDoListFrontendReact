import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Category } from '../../App';
import ToDoCheckbox from '../checkbox/checkbox';

const CardHeader = styled.div`
  background-color: #1976d2;
  color: white;
  margin: -15px -16px 0px -16px;
  padding: 5px 10px;
`;

const ToDoCard = ({ id, title, todos }: Category) => (
  <Card>
    <CardContent>
      <CardHeader>
        <Typography variant="h6">{title}</Typography>
      </CardHeader>
      {todos.map((todo) => (
        <ToDoCheckbox
          key={todo.id}
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
        />
      ))}
    </CardContent>
  </Card>
);

export default ToDoCard;
