import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EColors } from '../../interfaces';
import { useSubTodo } from '../../Context';
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
export interface SubCheckboxProps {
  id: number;
  todoId: number;
  categoryId: number;
  deleteSubTodo(id: number): void;
}

export const SubTaskCheckbox: React.FC<SubCheckboxProps> = ({
  id,
  todoId,
  categoryId,
  deleteSubTodo,
}) => {
  const [subTodo, setSubTodo] = useSubTodo(categoryId, todoId, id);
  const [subTodoEdit, setSubTodoEdit] = useState(subTodo);
  const { isCompleted } = subTodo;
  const { text, textColor, textStyle } = subTodoEdit;
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!editMode) {
      text === '' && deleteSubTodo(id);
      setSubTodo(subTodoEdit);
    }
  }, [editMode]);

  const onChecked = () => {
    setSubTodo({ ...subTodo, isCompleted: !isCompleted });
  };
  const onEdit = () => {
    setEditMode(!editMode);
  };
  const onDelete = () => {
    deleteSubTodo(id);
  };

  return (
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
        <Checkbox
          onClick={onChecked}
          checked={isCompleted}
          name="checkedB"
          color="primary"
        />

        {editMode ? (
          <EditMenu
            todo={subTodoEdit}
            setTodo={setSubTodoEdit}
            setEditMode={setEditMode}
            useOutsideClick={useOutsideClick.bind(null, ref)}
          />
        ) : (
          <div className="label">{text}</div>
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
