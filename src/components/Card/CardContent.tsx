import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { useTodos } from '../../Context';
import { ICategory, IGroupTodo } from '../../interfaces';
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
  category: ICategory;
}

export const CardContent: React.FC<CardContentProps> = ({ category }) => {
  const { setTodos, createTodo } = useTodos(category);
  const todos = category.todos;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderTodos = reorder(
      todos,
      result.source.index,
      result.destination.index,
    );
    setTodos(reorderTodos);
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
                            categoryId={category.id}
                            todo={todo}
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
