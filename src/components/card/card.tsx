import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Todo } from '../../App';
import ToDoCheckbox from '../checkbox/checkbox';
import CloseIcon from '@material-ui/icons/Close';
import serverAPI from '../../api/api';
import { MouseEvent, useEffect, useRef } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import InputEdit from '../Form/InputEdit';

const reorder = (
  list: Array<Todo>,
  startIndex: number,
  endIndex: number,
): Array<Todo> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface IProps {
  id: number;
  title: string;
  todos: Array<Todo>;
  closeCategory: Function;
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
  .icon {
    margin: 6px 3px 3px 0;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  .inputCard {
    font-size: 1.25rem;
  }
`;

const NewTodoButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  width: 100%;
  .button {
    color: #1976d2;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 14px;
    border: none;
    background-color: white;
    cursor: pointer;
  }
`;

const ToDoCard = ({ id, title, todos, closeCategory }: IProps) => {
  const [toDoCheckboxes, setToDoCheckboxes] = useState<Array<Todo>>([]);
  const [editMode, setEditMode] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const cardRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => {
    setToDoCheckboxes(todos);
  }, [todos]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderTodos = reorder(
      toDoCheckboxes,
      result.source.index,
      result.destination.index,
    );

    setToDoCheckboxes(reorderTodos);
  };

  const onClose = () => {
    closeCategory(id);
  };

  const closeTodo = async (todoId: number) => {
    try {
      await serverAPI.deleteTodo(todoId);
      setToDoCheckboxes(toDoCheckboxes.filter((todo) => todo.id !== todoId));
    } catch (error) {
      alert(error);
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onEdit = () => {
    setEditMode(!editMode);

    console.log('onEdit');
  };

  const handleChange = (e: any) => {
    setCardTitle(e.target.value);
  };

  const onBlur = () => {
    setEditMode(false);
    console.log('onBlur');
  };

  const addNewTodo = () => {};

  return (
    <CardWrap ref={cardRef}>
      <Card>
        <CardContent>
          <div className="header">
            {editMode ? (
              <InputEdit
                value={cardTitle}
                onChange={handleChange}
                className="inputCard"
                onBlur={onBlur}
              />
            ) : (
              <Typography variant="h6">{cardTitle}</Typography>
            )}
            <div>
              <EditIcon
                onClick={!editMode ? onEdit : () => {}}
                className="icon"
              />
              <CloseIcon onClick={onClose} className="icon" />
            </div>
          </div>
          <div onMouseDown={(e: MouseEvent) => onMouseDown(e)}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {toDoCheckboxes.map((todo: Todo, index: number) => (
                      <Draggable
                        key={todo.id}
                        draggableId={String(todo.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ToDoCheckbox
                              key={todo.id}
                              id={todo.id}
                              text={todo.text}
                              isCompleted={todo.isCompleted}
                              closeTodo={closeTodo}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <NewTodoButton>
            <button onClick={addNewTodo} className="button">
              Добавить новую задачу
            </button>
          </NewTodoButton>
        </CardContent>
      </Card>
    </CardWrap>
  );
};
export default ToDoCard;
