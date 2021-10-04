import { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ru';

import { ITodo } from '../interfaces';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { getCheckedSymbol } from '../utils/getCheckedSymbol';

interface TodoArchiveProps {
  id: number;
  categoryId: number;
  text: string;
  timeCompleted: Date | null;
  subTodos: Array<ITodo>;
  backTodo(categoryId: number, todoId: number): void;
  deleteTodo(categoryId: number, todoId: number): void;
}

const TodoArchiveWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  margin-bottom: 10px;

  .iconOptions {
    font-size: 18px;
    color: #8b8b8b;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  .delete {
    color: #df0b52;
  }
  .time {
    color: #acacac;
    font-size: 12px;
    margin-top: 5px;
  }
  .subTodo {
    margin-left: 10px;
    color: #727272;
  }
`;

const getTimeCompleted = (timeCompleted: Date) => {
  moment.locale('ru');
  const timeFormat = 'Do MMMM YYYY в HH:mm';
  const endTime = moment().add(1, 'week');
  return moment(timeCompleted).isBefore(endTime)
    ? moment(timeCompleted).fromNow()
    : moment(timeCompleted).format(timeFormat);
};

export const TodoArchive: React.FC<TodoArchiveProps> = ({
  id,
  categoryId,
  text,
  subTodos,
  timeCompleted,
  backTodo,
  deleteTodo,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TodoArchiveWrapper
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <div>
        <div>
          {getCheckedSymbol(!!timeCompleted)} {text}
        </div>
        {subTodos.map((subTodo) => (
          <div key={subTodo.id} className="subTodo">
            {getCheckedSymbol(subTodo.isCompleted)} {subTodo.text}
          </div>
        ))}
        <div className="time">
          {timeCompleted
            ? `Выполнено: ${getTimeCompleted(timeCompleted)}`
            : 'Не выполнено'}
        </div>
      </div>
      {isFocus && (
        <div>
          <ArrowForwardIcon
            data-testid="backTodoToMainPage"
            onClick={() => backTodo(categoryId, id)}
            className="iconOptions"
          />
          <DeleteOutlineIcon
            data-testid="deleteArchiveTodo"
            onClick={() => deleteTodo(categoryId, id)}
            className="iconOptions delete"
          />
        </div>
      )}
    </TodoArchiveWrapper>
  );
};
