import { useRef, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors, ETextStyle, ITodo } from '../../interfaces';
import { DeleteMenu } from './DeleteMenu';
import { EditMenu } from './EditMenu';
import { useOutsideClick } from '../../utils/useOutsideClick';

import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const CheckboxWrap = styled.div<{ textColor: string; textStyle: string }>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.textColor};
  font-weight: ${(props) => props.textStyle};
  .label-text__checked {
    text-decoration: line-through;
    color: gray;
  }
  .label-text__disabled {
    color: #d8d8d8;
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
`;
export interface CheckboxProps extends ITodo {
  isEdit?: boolean;
  categoryId: number;
  hasAddSubTaskButton: boolean;
  createSubTodo(categoryId: number, todoId: number): void;
  closeTodo(id: number): void;
  sendInArchive(categoryId: number): void;
}

export const ToDoCheckbox: React.FC<CheckboxProps> = ({
  id,
  categoryId,
  text,
  textColor,
  isCompleted,
  isEdit = false,
  textStyle,
  hasAddSubTaskButton,
  createSubTodo,
  sendInArchive,
  closeTodo,
}) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(isEdit);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [label, setLabel] = useState(text);
  const [colorText, setColorText] = useState<EColors>(textColor);
  const [checkboxTextStyle, setTextStyle] = useState(textStyle);
  const ref = useRef(null);

  const onChecked = () => {
    localStorageApi.checkedTodo(categoryId, id);
    setIsChecked(!isChecked);
  };
  const onEdit = () => {
    setEditMode(!editMode);
    setDeleteMenu(false);
    localStorageApi.changeTextTodo(categoryId, id, label);
  };
  const onDeleteMenu = () => {
    setDeleteMenu(!deleteMenu);
    setEditMode(false);
  };
  const addSubTask = () => {
    createSubTodo(categoryId, id);
  };

  const closeMenu = () => {
    localStorageApi.changeTextTodo(categoryId, id, label);
    label === '' && closeTodo(id);
    setEditMode(false);
  };

  const changeTextColor = (color: EColors) => {
    setColorText(color);
    localStorageApi.changeTextColor(categoryId, id, color);
  };

  const changeTextStyle = (textStyle: ETextStyle) => {
    setTextStyle(textStyle);
    localStorageApi.changeTextStyle(categoryId, id, textStyle);
  };

  return (
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
          {hasAddSubTaskButton && (
            <AddIcon
              data-testid="addSubTask"
              className="addSubTaskIcon"
              onClick={addSubTask}
            />
          )}
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
  );
};
