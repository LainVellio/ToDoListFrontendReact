import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import localStorageApi from '../../api/localStorageAPI';
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
  id: number;
  todos: Array<IGroupTodo>;
  editCard(key: string, value: unknown): void;
}

export const CardContent: React.FC<CardContentProps> = ({
  todos,
  id,
  editCard,
}) => {
  const createTodo = () => {
    const newToDo = localStorageApi.postTodo(id);
    editCard('todos', [...todos, { ...newToDo, isEdit: true }]);
  };

  const closeTodo = (categoryId: number) => (todoId: number) => {
    localStorageApi.deleteTodo(categoryId, todoId);
    editCard(
      'todos',
      todos.filter((checkbox) => checkbox.id !== todoId),
    );
  };

  const sendInArchive = (categoryId: number) => (todoId: number) => {
    localStorageApi.patchTodo<boolean>(categoryId, todoId, 'inArchive', true);
    editCard(
      'todos',
      todos.filter((checkbox) => checkbox.id !== todoId),
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderTodos = reorder(
      todos,
      result.source.index,
      result.destination.index,
    );
    editCard('todos', reorderTodos);
    localStorageApi.patchCategory<IGroupTodo[]>(id, 'todos', reorderTodos);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map(
                (todo: IGroupTodo, index: number) =>
                  !todo.inArchive && (
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
                          />
                        </div>
                      )}
                    </Draggable>
                  ),
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateTodoButton createTodo={createTodo} />
    </div>
  );
};
