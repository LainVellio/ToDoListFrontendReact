import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Category } from '../../App';
import ToDoCheckbox from '../checkbox/checkbox';

const CardWrap = styled.div`
  .header {
    background-color: #1976d2;
    color: white;
    margin: -15px -16px 0px -16px;
    padding: 5px 10px;
  }
`;

const ToDoCard = ({ id, title, todos }: Category) => (
  <CardWrap>
    <Card>
      <CardContent>
        <div className="header">
          <Typography variant="h6">{title}</Typography>
        </div>
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
  </CardWrap>
);

export default ToDoCard;
