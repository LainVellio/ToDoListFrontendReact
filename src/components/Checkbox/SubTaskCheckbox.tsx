import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EColors, ITodo } from '../../interfaces';
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
  subTodo: ITodo;
  todoId: number;
  categoryId: number;
}

export const SubTaskCheckbox: React.FC<SubCheckboxProps> = ({
  subTodo,
  todoId,
  categoryId,
}) => {
  const { setSubTodoProperties, deleteSubTodo } = useSubTodo(
    categoryId,
    todoId,
    subTodo,
  );
  const [subTodoEdit, setSubTodoEdit] = useState(subTodo);
  const { isCompleted } = subTodo;
  const { text, textColor, textStyle } = subTodoEdit;
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(text === '' ? true : false);
  const ref = useRef(null);

  useEffect(() => {
    if (!editMode) {
      text === ''
        ? deleteSubTodo()
        : setSubTodoProperties({ isCompleted, text, textColor, textStyle });
    }
  }, [editMode]);

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
          onClick={() => setSubTodoProperties({ isCompleted: !isCompleted })}
          checked={isCompleted}
          name="checkedB"
          color="primary"
        />

        {editMode ? (
          <EditMenu
            todo={subTodoEdit}
            isCompleted={isCompleted}
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
            onClick={() => setEditMode(!editMode)}
          />
          <DeleteOutlineIcon
            data-testid="deleteMenu"
            className="iconCheckbox deleteIcon"
            onClick={() => deleteSubTodo()}
          />
        </div>
      )}
    </CheckboxWrap>
  );
};
