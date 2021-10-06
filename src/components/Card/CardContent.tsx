import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import { useTodos } from '../../Context';
import { EColors, ETextStyle, IGroupTodo } from '../../interfaces';
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
}

export const CardContent: React.FC<CardContentProps> = ({ id }) => {
  const [todos, setTodos] = useTodos(id);

  const createTodo = () => {
    const newTodo = {
      text: '',
      id: Date.now(),
      isCompleted: false,
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
      timeCompleted: null,
      subTodos: [],
    };
    setTodos([...todos, newTodo]);
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
    setTodos(reorderTodos);
  };

  const sendInArchive = (todoId: number) => {
    setTodos(
      todos.map((todo: IGroupTodo) =>
        todo.id === todoId ? { ...todo, inArchive: true } : todo,
      ),
    );
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo: IGroupTodo) => todo.id !== todoId));
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
                            id={todo.id}
                            categoryId={id}
                            deleteTodo={deleteTodo}
                            sendInArchive={sendInArchive}
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
