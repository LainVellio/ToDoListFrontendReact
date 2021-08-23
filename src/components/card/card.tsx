import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Todo } from '../../App';
import ToDoCheckbox from '../checkbox/checkbox';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  id: number;
  title: string;
  todos: Array<Todo>;
  close: Function;
}

const CardWrap = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    background-color: #1976d2;
    color: white;
    margin: -15px -16px 0px -16px;
    padding: 5px 10px;
  }
  .closeIcon {
    margin: 3px;
    cursor: pointer;
  }
`;

const ToDoCard = ({ id, title, todos, close }: IProps) => {
  const onClose = () => {
    close(id);
  };
  return (
    <CardWrap>
      <Card>
        <CardContent>
          <div className="header">
            <Typography variant="h6">{title}</Typography>
            <CloseIcon onClick={onClose} className="closeIcon" />
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
};
export default ToDoCard;
