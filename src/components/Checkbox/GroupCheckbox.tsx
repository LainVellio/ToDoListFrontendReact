import { useState } from 'react';
import styled from 'styled-components';
import localStorageApi from '../../api/localStorageAPI';
import { IGroupTodo } from '../../interfaces';
import { ToDoCheckbox } from './ToDoCheckbox';

const SubCheckbox = styled.div`
  margin-left: 25px;
`;

interface GroupCheckboxProps extends IGroupTodo {
  isEdit?: boolean;
  categoryId: number;
  closeTodo(id: number): void;
  sendInArchive(categoryId: number): void;
}

export const GroupCheckbox: React.FC<GroupCheckboxProps> = ({
  id,
  categoryId,
  text,
  textColor,
  isCompleted,
  isEdit = false,
  inArchive,
  subTasks,
  textStyle,
  closeTodo,
  sendInArchive,
}) => {
  const [subCheckbox, setSubCheckbox] = useState(subTasks);
  const closeSubTodo =
    (categoryId: number, todoId: number) => (subTodoId: number) => {
      localStorageApi.deleteSubTodo(categoryId, todoId, subTodoId);
      setSubCheckbox((prev) =>
        prev.filter((subCheckbox) => subCheckbox.id !== subTodoId),
      );
    };

  const createSubTodo = (categoryId: number, todoId: number) => {
    const newSubTodo = localStorageApi.postSubTodo(categoryId, todoId);
    setSubCheckbox([...subCheckbox, { ...newSubTodo }]);
  };

  return (
    <div>
      <ToDoCheckbox
        key={id}
        id={id}
        categoryId={categoryId}
        text={text}
        isCompleted={isCompleted}
        isEdit={isEdit}
        textColor={textColor}
        textStyle={textStyle}
        inArchive={inArchive}
        closeTodo={closeTodo}
        sendInArchive={sendInArchive}
        createSubTodo={createSubTodo}
        hasAddSubTaskButton={true}
      />
      {subCheckbox.map((todo) => (
        <SubCheckbox>
          <ToDoCheckbox
            key={todo.id}
            id={todo.id}
            categoryId={categoryId}
            text={todo.text}
            isCompleted={todo.isCompleted}
            isEdit={isEdit}
            textColor={todo.textColor}
            textStyle={todo.textStyle}
            inArchive={todo.inArchive}
            closeTodo={closeSubTodo(categoryId, id)}
            sendInArchive={sendInArchive}
            createSubTodo={createSubTodo}
            hasAddSubTaskButton={false}
          />
        </SubCheckbox>
      ))}
    </div>
  );
};
