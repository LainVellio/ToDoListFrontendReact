import { useRef, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors, ITodo } from '../../interfaces';
import { DeleteMenu } from './DeleteMenu';
import { EditMenu } from './EditMenu';
import { useOutsideClick } from '../../utils/useOutsideClick';

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
    color: #8b8b8b;
    margin-top: 10px;
    padding: 2px;
  }
  .iconCheckbox {
    cursor: pointer;
    width: 19px;
    height: 19px;
  }
  .checkbox {
    display: flex;
    position: relative;
    align-items: center;
  }
  .label {
    background-color: white;
  }
`;
interface CheckboxProps extends ITodo {
  categoryId: number;
  isEdit?: boolean;
  closeTodo(id: number): void;
  sendInArchive(categoryId: number): void;
}

const ToDoCheckbox: React.FC<CheckboxProps> = ({
  id,
  categoryId,
  text,
  textColor,
  isCompleted,
  isEdit = false,
  textStyle,
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

  return (
    <CheckboxWrap
      ref={ref}
      textColor={colorText}
      textStyle={checkboxTextStyle}
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <span>
        <div className={`checkbox ${isChecked ? 'label-text__checked' : ''}`}>
          <Checkbox
            onClick={onChecked}
            checked={isChecked}
            name="checkedB"
            color="primary"
          />
          {editMode ? (
            <>
              <EditMenu
                id={id}
                categoryId={categoryId}
                label={label}
                isChecked={isChecked}
                checkboxTextStyle={checkboxTextStyle}
                colorText={colorText}
                setLabel={setLabel}
                setColorText={setColorText}
                setTextStyle={setTextStyle}
                closeTodo={closeTodo}
                setEditMode={setEditMode}
                useOutsideClick={useOutsideClick.bind(null, ref)}
              />
            </>
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
      </span>
      {isFocus && (
        <div className="options">
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

export default ToDoCheckbox;
