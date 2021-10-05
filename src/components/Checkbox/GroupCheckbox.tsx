import { SubTaskCheckbox } from './SubTaskCheckbox';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors, ETextStyle, IGroupTodo } from '../../interfaces';
import { DeleteMenu } from './DeleteMenu';
import { EditMenu } from './EditMenu';
import { useOutsideClick } from '../../utils/useOutsideClick';

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

export interface GroupCheckboxProps extends IGroupTodo {
  categoryId: number;
  isEdit?: boolean;
  closeTodo(id: number): void;
  sendInArchive(categoryId: number): void;
}

export const GroupCheckbox: React.FC<GroupCheckboxProps> = ({
  id,
  categoryId,
  text,
  textColor,
  isCompleted,
  subTasks,
  textStyle,
  isEdit = false,
  closeTodo,
  sendInArchive,
}) => {
  const [subCheckboxes, setSubCheckboxes] = useState(subTasks);
  const [groupIsOpen, setGroupIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(isEdit);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [label, setLabel] = useState(text);
  const [colorText, setColorText] = useState<EColors>(textColor);
  const [checkboxTextStyle, setTextStyle] = useState(textStyle);
  const ref = useRef(null);

  useEffect(() => {
    if (subCheckboxes.length > 0) {
      if (subCheckboxes.every((subCheckbox) => subCheckbox.isCompleted)) {
        localStorageApi.checkedTodo(categoryId, id);
        setIsChecked(true);
      } else {
        localStorageApi.checkedTodo(categoryId, id);
        setIsChecked(false);
      }
    }
  }, [categoryId, id, subCheckboxes]);

  const onChecked = () => {
    localStorageApi.checkedTodo(categoryId, id);
    setIsChecked(!isChecked);
    isChecked
      ? setSubCheckboxes((prev) =>
          prev.map((subCheckbox) => {
            subCheckbox.isCompleted &&
              localStorageApi.checkedSubTodo(categoryId, id, subCheckbox.id);
            return { ...subCheckbox, isCompleted: false };
          }),
        )
      : setSubCheckboxes((prev) =>
          prev.map((subCheckbox) => {
            !subCheckbox.isCompleted &&
              localStorageApi.checkedSubTodo(categoryId, id, subCheckbox.id);
            return { ...subCheckbox, isCompleted: true };
          }),
        );
  };

  const setCheckedSubTask = (id: number) => (isCompleted: boolean) => {
    setSubCheckboxes((prev) =>
      prev.map((subCheckbox) =>
        subCheckbox.id === id
          ? { ...subCheckbox, isCompleted: isCompleted }
          : subCheckbox,
      ),
    );
  };

  const onEdit = () => {
    setEditMode(!editMode);
    setDeleteMenu(false);
    localStorageApi.patchTodo<string>(categoryId, id, 'text', label);
  };
  const onDeleteMenu = () => {
    setDeleteMenu(!deleteMenu);
    setEditMode(false);
  };
  const addSubTask = () => {
    setGroupIsOpen(true);
    const newSubTodo = localStorageApi.postSubTodo(categoryId, id);
    setSubCheckboxes([...subCheckboxes, { ...newSubTodo }]);
    setEditMode(true);
  };

  const changeTextColor = (color: EColors) => {
    setColorText(color);
    localStorageApi.patchTodo<EColors>(categoryId, id, 'textColor', color);
  };
  const changeTextStyle = (textStyle: ETextStyle) => {
    setTextStyle(textStyle);
    localStorageApi.patchTodo<ETextStyle>(
      categoryId,
      id,
      'textStyle',
      textStyle,
    );
  };
  const closeMenu = () => {
    localStorageApi.patchTodo<string>(categoryId, id, 'text', label);
    label === '' && closeTodo(id);
    setEditMode(false);
  };

  const deleteSubTodo =
    (categoryId: number, todoId: number) => (subTodoId: number) => {
      localStorageApi.deleteSubTodo(categoryId, todoId, subTodoId);
      setSubCheckboxes((prev) =>
        prev.filter((subCheckbox) => subCheckbox.id !== subTodoId),
      );
    };

  return (
    <div>
      <CheckboxWrap
        ref={ref}
        textColor={colorText}
        data-testid="checkbox"
        textStyle={checkboxTextStyle}
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
      >
        <div
          data-testid="checkboxWrapper"
          className={`checkbox ${isChecked ? 'label-text__checked' : ''}`}
        >
          {subCheckboxes.length > 0 && (
            <div
              className="arrowIcon"
              onClick={() => setGroupIsOpen(!groupIsOpen)}
            >
              {groupIsOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </div>
          )}
          <Checkbox
            onClick={onChecked}
            checked={isChecked}
            name="checkedB"
            color="primary"
          />

          {editMode ? (
            <EditMenu
              label={label}
              isChecked={isChecked}
              checkboxTextStyle={checkboxTextStyle}
              colorText={colorText}
              setLabel={setLabel}
              changeTextColor={changeTextColor}
              changeTextStyle={changeTextStyle}
              closeTodo={closeTodo}
              setEditMode={setEditMode}
              useOutsideClick={useOutsideClick.bind(null, ref)}
              closeMenu={closeMenu}
            />
          ) : (
            <div className="label">{label}</div>
          )}
          {deleteMenu && (
            <DeleteMenu
              sendInArchive={sendInArchive}
              setDeleteMenu={setDeleteMenu}
              closeTodo={closeTodo}
              id={id}
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
        subCheckboxes.map((subTodo) => (
          <SubTaskCheckbox
            categoryId={categoryId}
            key={subTodo.id}
            todoId={id}
            id={subTodo.id}
            text={subTodo.text}
            isCompleted={subTodo.isCompleted}
            textColor={subTodo.textColor}
            textStyle={subTodo.textStyle}
            inArchive={subTodo.inArchive}
            deleteTodo={deleteSubTodo(categoryId, id)}
            sendInArchive={sendInArchive}
            setCheckedSubTask={setCheckedSubTask(subTodo.id)}
          />
        ))}
    </div>
  );
};
