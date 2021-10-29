import React, { Reducer, useEffect, useReducer, useRef, useState } from 'react';

import { ITodo, ITodoEdit, ITodoEditProperties } from '../../../interfaces';
import { useTodo } from '../../../Context';
import { DeleteMenu } from '../DeleteMenu/DeleteMenu';
import { EditMenu } from '../EditMenu/EditMenu';
import { SubTodoCheckbox } from '../SubTodoCheckbox/SubTodoCheckbox';
import useEmptyDelete from '../../../utils/useEmptyDelete';

import CheckboxWrap from './GroupCheckbox.style';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export interface GroupCheckboxProps {
  categoryId: number;
  todoId: number;
}
export const GroupCheckbox: React.FC<GroupCheckboxProps> = ({
  categoryId,
  todoId,
}) => {
  const { todo, createSubTodo, setTodoProperties, deleteTodo } = useTodo(
    categoryId,
    todoId,
  );

  const [todoEdit, setTodoEdit] = useReducer<
    Reducer<ITodoEdit, ITodoEditProperties>
  >(
    (todoEdit: ITodoEdit, property: ITodoEditProperties) => ({
      ...todoEdit,
      ...property,
    }),
    todo,
  );
  const { id, isCompleted, isOpen } = todo;
  const { text, textColor, textStyle } = todoEdit;

  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(text === '' ? true : false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const ref = useRef(null);
  const subTodos = todo.subTodos;

  const checkedTodo = (isCompleted: boolean) => {
    const timeCompleted = isCompleted ? Date.now() : null;
    const changeSubTodos = subTodos.map((subTodo: ITodo) => ({
      ...subTodo,
      isCompleted,
    }));
    setTodoProperties({ isCompleted, timeCompleted, subTodos: changeSubTodos });
  };

  useEmptyDelete(editMode, text, deleteTodo, () =>
    setTodoProperties({
      isCompleted,
      isOpen,
      text,
      textColor,
      textStyle,
    }),
  );
  useEffect(() => {
    if (subTodos.length > 0) {
      subTodos.every((subTask: ITodo) => subTask.isCompleted)
        ? setTodoProperties({ isCompleted: true })
        : setTodoProperties({ isCompleted: false });
    }
  }, [subTodos]);

  const onEdit = () => {
    setDeleteMenu(false);
    setEditMode(!editMode);
  };
  const onDeleteMenu = () => {
    setEditMode(false);
    setDeleteMenu(!deleteMenu);
  };

  return (
    <div>
      <CheckboxWrap
        ref={ref}
        textColor={textColor}
        data-testid="checkbox"
        textStyle={textStyle}
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
      >
        <div
          data-testid="checkboxWrapper"
          className={`checkbox ${isCompleted ? 'label-text__checked' : ''}`}
        >
          {subTodos.length > 0 && (
            <div
              className="arrowIcon"
              onClick={() => setTodoProperties({ isOpen: !isOpen })}
            >
              {isOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </div>
          )}
          <Checkbox
            onClick={() => checkedTodo(!isCompleted)}
            checked={isCompleted}
            name="checkedB"
            color="primary"
          />

          {editMode ? (
            <EditMenu
              todoEdit={todoEdit}
              setTodo={setTodoEdit}
              setEditMode={setEditMode}
              outsideRef={ref}
              isCompleted={isCompleted}
            />
          ) : (
            <div className="label">{text}</div>
          )}
          {deleteMenu && (
            <DeleteMenu
              sendInArchive={() => {
                setTodoProperties({ inArchive: true });
              }}
              setDeleteMenu={setDeleteMenu}
              deleteTodo={deleteTodo}
              outsideRef={ref}
            />
          )}
        </div>

        {isFocus && (
          <div className="options">
            <AddIcon
              data-testid="addSubTask"
              className="addSubTaskIcon"
              onClick={() => {
                createSubTodo();
              }}
            />

            <EditIcon
              data-testid="editCheckbox"
              className="iconCheckbox"
              onClick={onEdit}
            />
            <DeleteOutlineIcon
              data-testid="deleteMenu"
              className="iconCheckbox"
              onClick={onDeleteMenu}
            />
          </div>
        )}
      </CheckboxWrap>
      {isOpen &&
        subTodos.map((subTodo: ITodo) => (
          <SubTodoCheckbox
            key={subTodo.id}
            categoryId={categoryId}
            todoId={id}
            subTodoId={subTodo.id}
          />
        ))}
    </div>
  );
};
