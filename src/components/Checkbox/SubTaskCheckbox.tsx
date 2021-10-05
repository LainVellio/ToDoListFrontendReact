import { useRef, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors, ETextStyle, ITodo } from '../../interfaces';
import { EditMenu } from './EditMenu';
import { useOutsideClick } from '../../utils/useOutsideClick';

import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const CheckboxWrap = styled.div<{ textColor: string; textStyle: string }>`
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-left: 25px;
  color: ${(props) => props.textColor};
  font-weight: ${(props) => props.textStyle};
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
  .deleteIcon {
    color: ${EColors.red};
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
export interface SubCheckboxProps extends ITodo {
  todoId: number;
  categoryId: number;
  setCheckedSubTask(isChecked: boolean): void;
  deleteTodo(id: number): void;
  sendInArchive(categoryId: number): void;
}

export const SubTaskCheckbox: React.FC<SubCheckboxProps> = ({
  id,
  todoId,
  categoryId,
  text,
  textColor,
  isCompleted,
  textStyle,
  setCheckedSubTask,
  deleteTodo,
}) => {
  const [label, setLabel] = useState(text);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [colorText, setColorText] = useState<EColors>(textColor);
  const [checkboxTextStyle, setTextStyle] = useState(textStyle);
  const ref = useRef(null);

  const onChecked = () => {
    localStorageApi.checkedSubTodo(categoryId, todoId, id);
    setCheckedSubTask(!isCompleted);
  };
  const onEdit = () => {
    setEditMode(!editMode);
    localStorageApi.patchSubTodo<string>(categoryId, todoId, id, 'text', label);
  };

  const closeMenu = () => {
    localStorageApi.patchSubTodo<string>(categoryId, todoId, id, 'text', label);
    label === '' && deleteTodo(id);
    setEditMode(false);
  };

  const changeTextColor = (color: EColors) => {
    setColorText(color);
    localStorageApi.patchSubTodo<EColors>(
      categoryId,
      todoId,
      id,
      'textColor',
      color,
    );
  };

  const changeTextStyle = (textStyle: ETextStyle) => {
    setTextStyle(textStyle);
    localStorageApi.patchSubTodo<ETextStyle>(
      categoryId,
      todoId,
      id,
      'textStyle',
      textStyle,
    );
  };

  const onDelete = () => {
    deleteTodo(id);
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
        className={`checkbox ${isCompleted ? 'label-text__checked' : ''}`}
      >
        <Checkbox
          onClick={onChecked}
          checked={isCompleted}
          name="checkedB"
          color="primary"
        />

        {editMode ? (
          <EditMenu
            label={label}
            isChecked={isCompleted}
            checkboxTextStyle={checkboxTextStyle}
            colorText={colorText}
            setLabel={setLabel}
            changeTextColor={changeTextColor}
            changeTextStyle={changeTextStyle}
            closeTodo={deleteTodo}
            setEditMode={setEditMode}
            useOutsideClick={useOutsideClick.bind(null, ref)}
            closeMenu={closeMenu}
          />
        ) : (
          <div className="label">{label}</div>
        )}
      </div>

      {isFocus && (
        <div className="options">
          <EditIcon
            data-testid="editCheckbox"
            className="iconCheckbox"
            onClick={onEdit}
          />
          <DeleteOutlineIcon
            data-testid="deleteMenu"
            className="iconCheckbox deleteIcon"
            onClick={onDelete}
          />
        </div>
      )}
    </CheckboxWrap>
  );
};
