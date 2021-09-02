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
import AddIcon from '@material-ui/icons/Add';
import ColorCircle, { Colors } from '../checkbox/ColorCircle';

interface IProps {
  id: number;
  title: string;
  todos: Array<Todo>;
  closeCategory: Function;
  isEdit?: boolean;
}

interface Checkbox extends Todo {
  isEdit?: boolean;
}

const CardWrap = styled.div<{ headerColor: string }>`
  .header {
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.headerColor};
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
  .colorCircles {
    display: flex;
    margin: 10px 0 5px 10px;
  }
`;

const NewTodoButton = styled.div`
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

const ToDoCard = ({
  id,
  title,
  todos,
  closeCategory,
  isEdit = false,
}: IProps) => {
  const [toDoCheckboxes, setToDoCheckboxes] = useState<Array<Checkbox>>([]);
  const [editMode, setEditMode] = useState(isEdit);
  const [cardTitle, setCardTitle] = useState(title);
  const [headerColor, setHeaderColor] = useState<Colors>(Colors.blue);
  const cardRef = useRef(null);

  const colors: Array<Colors> = [Colors.red, Colors.blue, Colors.green];

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
  };

  const handleChange = (e: any) => {
    setCardTitle(e.target.value);
  };

  const onBlur = () => {
    setEditMode(false);
  };

  const addNewTodo = async () => {
    const newToDo = await serverAPI.postTodo({
      title: title,
      text: 'Новая задача',
    });
    setToDoCheckboxes([
      ...toDoCheckboxes,
      { ...newToDo.data.todos[0], isEdit: true },
    ]);
  };

  return (
    <CardWrap headerColor={headerColor} ref={cardRef}>
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
            {editMode && (
              <div className="colorCircles">
                {colors.map(
                  (color) =>
                    color !== headerColor && (
                      <ColorCircle
                        key={color}
                        color={color}
                        setEditMode={setEditMode}
                        setColor={setHeaderColor}
                        border={true}
                      />
                    ),
                )}
              </div>
            )}
            <div>
              {!editMode ? (
                <EditIcon onClick={onEdit} className="icon" />
              ) : (
                <span>
                  <EditIcon className="icon" />
                </span>
              )}
              <CloseIcon onClick={onClose} className="icon" />
            </div>
          </div>
          <div onMouseDown={(e: MouseEvent) => onMouseDown(e)}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {toDoCheckboxes.map((todo: Checkbox, index: number) => (
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
                              isEdit={todo.isEdit}
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
              <AddIcon className="addIcon" />
              Добавить новую задачу
            </button>
          </NewTodoButton>
        </CardContent>
      </Card>
    </CardWrap>
  );
};
export default ToDoCard;
