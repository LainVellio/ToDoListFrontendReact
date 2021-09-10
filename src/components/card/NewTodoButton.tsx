import styled from 'styled-components';

import AddIcon from '@material-ui/icons/Add';

const NewTodoButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  width: 100%;
  .button {
    display: flex;
    align-items: center;
    color: #1976d2;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 14px;
    border: none;
    background-color: white;
    cursor: pointer;
  }
  .button:hover {
    color: #3f51b5;
  }
  .addIcon {
    margin-right: 5px;
  }
`;

interface NewTodoButtonProps {
  addNewTodo(): void;
}

export const NewTodoButton: React.FC<NewTodoButtonProps> = ({ addNewTodo }) => {
  return (
    <NewTodoButtonWrap>
      <button data-testid="addNewTodo" onClick={addNewTodo} className="button">
        <AddIcon className="addIcon" />
        Добавить новую задачу
      </button>
    </NewTodoButtonWrap>
  );
};
