import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import serverAPI from '../../api/api';
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
}
interface Checkbox extends ITodo {
  isEdit?: boolean;
}

export const CardContent: React.FC<CardContentProps> = ({ todos, title }) => {
  const [toDoCheckboxes, setToDoCheckboxes] = useState<Array<Checkbox>>([]);
  useEffect(() => {
    setToDoCheckboxes(todos);
  }, [todos]);

  const addNewTodo = async () => {
    try {
      const newToDo = await serverAPI.postTodo({
        title: title,
        text: 'Новая задача',
      });
      setToDoCheckboxes([
        ...toDoCheckboxes,
        { ...newToDo.data.todos[0], isEdit: true },
      ]);
    } catch (error) {
      alert(error);
    }
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
  };

  const closeTodo = async (todoId: number) => {
    try {
      await serverAPI.deleteTodo(todoId);
      setToDoCheckboxes(toDoCheckboxes.filter((todo) => todo.id !== todoId));
    } catch (error) {
      alert(error);
    }
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
                        text={todo.text}
                        isCompleted={todo.isCompleted}
                        isEdit={todo.isEdit}
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
      <NewTodoButton addNewTodo={addNewTodo} />
    </div>
  );
};
