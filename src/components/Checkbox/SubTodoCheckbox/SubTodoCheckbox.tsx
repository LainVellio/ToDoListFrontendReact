import React, { Reducer, useReducer, useRef, useState } from 'react';

import { ITodoEdit, ITodoEditProperties } from '../../../interfaces';
import { useSubTodo } from '../../../Context';
import { EditMenu } from '../EditMenu/EditMenu';
import useEmptyDelete from '../../../utils/useEmptyDelete';

import CheckboxWrap from './SubTodoCheckbox.style';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

export interface SubCheckboxProps {
  subTodoId: number;
  todoId: number;
  categoryId: number;
}

export const SubTodoCheckbox: React.FC<SubCheckboxProps> = ({
  subTodoId,
  todoId,
  categoryId,
}) => {
  const { subTodo, setSubTodoProperties, deleteSubTodo } = useSubTodo(
    categoryId,
    todoId,
    subTodoId,
  );
  const { isCompleted } = subTodo;
  const [subTodoEdit, setSubTodoEdit] = useReducer<
    Reducer<ITodoEdit, ITodoEditProperties>
  >(
    (todoEdit: ITodoEdit, property: ITodoEditProperties) => ({
      ...todoEdit,
      ...property,
    }),
    subTodo,
  );
  const { text, textColor, textStyle } = subTodoEdit;
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(text === '' ? true : false);
  const ref = useRef(null);

  useEmptyDelete(editMode, text, deleteSubTodo, () =>
    setSubTodoProperties({
      isCompleted,
      text,
      textColor,
      textStyle,
    }),
  );

  return (
    <CheckboxWrap
      ref={ref}
      textColor={textColor}
      data-testid="subTodo"
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
            todoEdit={subTodoEdit}
            setTodo={setSubTodoEdit}
            isCompleted={isCompleted}
            setEditMode={setEditMode}
            outsideRef={ref}
          />
        ) : (
          <div className="label">{text}</div>
        )}
      </div>

      {isFocus && (
        <div className="options">
          <EditIcon
            data-testid="editSubCheckbox"
            className="iconCheckbox"
            onClick={() => setEditMode(!editMode)}
          />
          <DeleteOutlineIcon
            data-testid="deleteButton"
            className="iconCheckbox deleteIcon"
            onClick={deleteSubTodo}
          />
        </div>
      )}
    </CheckboxWrap>
  );
};
