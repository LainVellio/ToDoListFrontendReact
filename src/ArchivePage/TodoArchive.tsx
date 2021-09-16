import { useState } from 'react';
import styled from 'styled-components';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

interface TodoArchiveProps {
  id: number;
  categoryId: number;
  text: string;
  backTodo(categoryId: number, todoId: number): void;
  deleteTodo(categoryId: number, todoId: number): void;
}

const TodoArchiveWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;

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
`;

export const TodoArchive: React.FC<TodoArchiveProps> = ({
  id,
  categoryId,
  text,
  backTodo,
  deleteTodo,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TodoArchiveWrapper
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      {text}
      {isFocus && (
        <div>
          <ArrowForwardIcon
            onClick={() => backTodo(categoryId, id)}
            className="iconOptions"
          />
          <DeleteOutlineIcon
            onClick={() => deleteTodo(categoryId, id)}
            className="iconOptions delete"
          />
        </div>
      )}
    </TodoArchiveWrapper>
  );
};
