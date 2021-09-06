import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import localStorageApi from '../../api/localStorageAPI';
import { ITodo } from '../../interfaces';
import ToDoCheckbox from '../checkbox/ToDoCheckbox';
import { NewTodoButton } from './NewTodoButton';

const reorder = (
  list: Array<ITodo>,
  startIndex: number,
  endIndex: number,
): Array<ITodo> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface CardContentProps {
  todos: Array<ITodo>;
  title: string;
  id: number;
}
interface Checkbox extends ITodo {
  isEdit?: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({
  todos,
  title,
  id,
}) => {
  const [toDoCheckboxes, setToDoCheckboxes] = useState<Array<Checkbox>>([]);
  useEffect(() => {
    setToDoCheckboxes(todos);
  }, [todos]);

  const addNewTodo = () => {
    const newToDo = localStorageApi.postTodo(id, '');
    setToDoCheckboxes([...toDoCheckboxes, { ...newToDo, isEdit: true }]);
  };

  const closeTodo = (categoryId: number) => (todoId: number) => {
    localStorageApi.deleteTodo(categoryId, todoId);
    setToDoCheckboxes((prev) =>
      prev.filter((checkbox) => checkbox.id !== todoId),
    );
  };

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
    localStorageApi.setOrderedTodos(id, reorderTodos);
  };

  return (
    <div>
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
                        categoryId={id}
                        text={todo.text}
                        isCompleted={todo.isCompleted}
                        isEdit={todo.isEdit}
                        closeTodo={closeTodo(id)}
                        textColor={todo.textColor}
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
      <NewTodoButton addNewTodo={addNewTodo} />
    </div>
  );
};
