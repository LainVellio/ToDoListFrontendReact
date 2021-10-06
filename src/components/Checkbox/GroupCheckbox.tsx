import { SubTaskCheckbox } from './SubTaskCheckbox';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useSubTodos, useTodo } from '../../Context';
import { useOutsideClick } from '../../utils/useOutsideClick';
import { EColors, ETextStyle, ITodo } from '../../interfaces';
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
  id: number;
  categoryId: number;
  deleteTodo(id: number): void;
  sendInArchive(categoryId: number): void;
}

export const GroupCheckbox: React.FC<GroupCheckboxProps> = ({
  id,
  categoryId,
  deleteTodo,
  sendInArchive,
}) => {
  const [todo, setTodo] = useTodo(categoryId, id);
  const [todoEdit, setTodoEdit] = useState(todo);
  const [subTodos, setSubTodos] = useSubTodos(categoryId, id);
  const { isCompleted } = todo;
  const { text, textColor, textStyle } = todoEdit;

  const [groupIsOpen, setGroupIsOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(text === '' ? true : false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!editMode) {
      text === '' ? deleteTodo(id) : setTodo(todoEdit);
    }
  }, [editMode]);

  useEffect(() => {
    if (subTodos.length > 0) {
      if (subTodos.every((subTask: ITodo) => subTask.isCompleted)) {
        setTodo({ ...todo, isCompleted: true });
      } else {
        setTodo({ ...todo, isCompleted: false });
      }
    }
  }, [subTodos]);

  const onChecked = () => {
    setTodo({ ...todo, isCompleted: !isCompleted });
    isCompleted
      ? setSubTodos(
          subTodos.map((subTask: ITodo) =>
            subTask.isCompleted ? { ...subTask, isCompleted: false } : subTask,
          ),
        )
      : setSubTodos(
          subTodos.map((subTask: ITodo) =>
            !subTask.isCompleted ? { ...subTask, isCompleted: true } : subTask,
          ),
        );
  };

  const onEdit = () => {
    setDeleteMenu(false);
    setEditMode(!editMode);
  };
  const onDeleteMenu = () => {
    setEditMode(false);
    setDeleteMenu(!deleteMenu);
  };
  const addSubTask = () => {
    setGroupIsOpen(true);
    const newSubTodo = {
      text: '',
      id: Date.now(),
      isCompleted: false,
      textColor: EColors.black,
      textStyle: ETextStyle.normal,
      inArchive: false,
      timeCompleted: null,
    };
    setSubTodos([...subTodos, { ...newSubTodo }]);
  };
  const deleteSubTodo = (subTodoId: number) => {
    setSubTodos(subTodos.filter((subTodo: ITodo) => subTodo.id !== subTodoId));
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
              onClick={() => setGroupIsOpen(!groupIsOpen)}
            >
              {groupIsOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </div>
          )}
          <Checkbox
            onClick={onChecked}
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
            />
          ) : (
            <div className="label">{text}</div>
          )}
          {deleteMenu && (
            <DeleteMenu
              id={id}
              sendInArchive={sendInArchive}
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
              onClick={addSubTask}
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
      {groupIsOpen &&
        subTodos.map((subTodo: ITodo) => (
          <SubTaskCheckbox
            key={subTodo.id}
            id={subTodo.id}
            todoId={id}
            categoryId={categoryId}
            deleteSubTodo={deleteSubTodo}
          />
        ))}
    </div>
  );
};
