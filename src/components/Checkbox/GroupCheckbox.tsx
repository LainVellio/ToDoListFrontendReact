import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useTodo } from '../../Context';
import checkEmpty from '../../utils/checkEmpty';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { SubTaskCheckbox } from './SubTaskCheckbox';
import { IGroupTodo, ITodo } from '../../interfaces';
import { DeleteMenu } from './DeleteMenu';
import { EditMenu } from './EditMenu';

import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const CheckboxWrap = styled.div<{ textColor: string; textStyle: string }>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.textColor};
  font-weight: ${(props) => props.textStyle};
  margin-left: 10px;
  .label-text__checked {
    text-decoration: line-through;
    color: gray;
    font-weight: normal;
  }
  .options {
    display: flex;
    align-items: center;
    color: #8b8b8b;
    margin-top: 10px;
    padding: 2px;
  }
  .iconCheckbox {
    cursor: pointer;
    width: 19px;
    height: 19px;
  }
  .addSubTaskIcon {
    cursor: pointer;
  }
  .checkbox {
    display: flex;
    position: relative;
    align-items: center;
  }
  .label {
    background-color: white;
    word-wrap: break-word;
  }
  .arrowIcon {
    position: absolute;
    display: flex;
    margin-left: -18px;
    cursor: pointer;
    color: gray;
  }
`;

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

  const [todoEdit, setTodoEdit] = useState<IGroupTodo | ITodo>(todo);
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

  useEffect(() => {
    !editMode &&
      checkEmpty(
        text,
        deleteTodo,
        setTodoProperties.bind(null, {
          isCompleted,
          isOpen,
          text,
          textColor,
          textStyle,
        }),
      );
  }, [editMode]);

  useEffect(() => {
    if (subTodos.length > 0) {
      console.log('pic');
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
              todo={todoEdit}
              setTodo={setTodoEdit}
              setEditMode={setEditMode}
              useOutsideClick={useOutsideClick.bind(null, ref)}
              isCompleted={isCompleted}
            />
          ) : (
            <div className="label">{text}</div>
          )}
          {deleteMenu && (
            <DeleteMenu
              id={id}
              sendInArchive={() => {
                setTodoProperties({ inArchive: true });
              }}
              setDeleteMenu={setDeleteMenu}
              deleteTodo={deleteTodo}
              useOutsideClick={useOutsideClick.bind(null, ref)}
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
          <SubTaskCheckbox
            key={subTodo.id}
            subTodoId={subTodo.id}
            todoId={id}
            categoryId={categoryId}
          />
        ))}
    </div>
  );
};
