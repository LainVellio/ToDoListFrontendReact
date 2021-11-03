import React, { Reducer, useReducer, useRef, useState } from 'react';

import {
  EColors,
  ENumberingType,
  ETextStyle,
  ISubTodoEdit,
  ISubTodoEditProperties,
} from '../../../interfaces';
import { useSubTodo } from '../../../Context';
import { EditMenu } from '../EditMenu/EditMenu';
import useEmptyDelete from '../../../utils/useEmptyDelete';

import CheckboxWrap from './SubTodoCheckbox.style';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import getNumberingSymbol from '../../../utils/getNumberingSymbol';

export interface SubCheckboxProps {
  subTodoId: number;
  todoId: number;
  index: number;
  categoryId: number;
  textColor: EColors;
  textStyle: ETextStyle;
  numberingType: ENumberingType;
}

export const SubTodoCheckbox: React.FC<SubCheckboxProps> = ({
  subTodoId,
  todoId,
  categoryId,
  textColor,
  textStyle,
  index,
  numberingType,
}) => {
  const { subTodo, setSubTodoProperties, deleteSubTodo } = useSubTodo(
    categoryId,
    todoId,
    subTodoId,
  );
  const { isCompleted } = subTodo;
  const [subTodoEdit, setSubTodoEdit] = useReducer<
    Reducer<ISubTodoEdit, ISubTodoEditProperties>
  >(
    (todoEdit: ISubTodoEdit, property: ISubTodoEditProperties) => ({
      ...todoEdit,
      ...property,
    }),
    subTodo,
  );
  const { text } = subTodoEdit;
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(text === '' ? true : false);
  const ref = useRef(null);

  useEmptyDelete(editMode, text, deleteSubTodo, () =>
    setSubTodoProperties({
      isCompleted,
      text,
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
        <div className={numberingType}>
          {getNumberingSymbol(index, numberingType)}
        </div>
        {editMode ? (
          <EditMenu
            text={subTodoEdit.text}
            textColor={textColor}
            textStyle={textStyle}
            setTodoEdit={setSubTodoEdit}
            isCompleted={isCompleted}
            setEditMode={setEditMode}
            MenuContent={() => null}
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
