import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import localStorageApi, { getCategory } from '../../api/localStorageAPI';
import { IGroupTodo } from '../../interfaces';
import { GroupCheckbox } from '../Checkbox/GroupCheckbox';
import { CreateTodoButton } from './CreateTodoButton';

export const reorder = (
  list: Array<IGroupTodo>,
  startIndex: number,
  endIndex: number,
): Array<IGroupTodo> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export interface CardContentProps {
  todos: Array<IGroupTodo>;
  id: number;
}
export interface Checkbox extends IGroupTodo {
  isEdit?: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({ todos, id }) => {
  const [toDoCheckboxes, setToDoCheckboxes] = useState<Array<Checkbox>>(todos);
  useEffect(() => {
    setToDoCheckboxes(todos.filter((todo) => todo.inArchive === false));
  }, [todos]);

  const createTodo = () => {
    const newToDo = localStorageApi.postTodo(id);
    setToDoCheckboxes([...toDoCheckboxes, { ...newToDo, isEdit: true }]);
  };

  const closeTodo = (categoryId: number) => (todoId: number) => {
    localStorageApi.deleteTodo(categoryId, todoId);
    setToDoCheckboxes((prev) =>
      prev.filter((checkbox) => checkbox.id !== todoId),
    );
  };

  const sendInArchive = (categoryId: number) => (todoId: number) => {
    localStorageApi.sendTodoInArchive(categoryId, todoId);
    setToDoCheckboxes((prev) =>
      prev.filter((checkbox) => checkbox.id !== todoId),
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderTodos = reorder(
      getCategory(id).todos,
      result.source.index,
      result.destination.index,
    );
    setToDoCheckboxes(reorderTodos);
    console.log(reorderTodos);
    localStorageApi.setOrderedTodos(id, reorderTodos);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {toDoCheckboxes.map((todo: IGroupTodo, index: number) => (
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
                      <GroupCheckbox
                        key={todo.id}
                        inArchive={todo.inArchive}
                        id={todo.id}
                        categoryId={id}
                        text={todo.text}
                        isCompleted={todo.isCompleted}
                        closeTodo={closeTodo(id)}
                        sendInArchive={sendInArchive(id)}
                        textColor={todo.textColor}
                        textStyle={todo.textStyle}
                        subTasks={todo.subTasks}
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
      <CreateTodoButton createTodo={createTodo} />
    </div>
  );
};
