import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { EColors } from '../../interfaces';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import localStorageApi from '../../api/localStorageAPI';

const CheckboxWrap = styled.div<{ textColor: string }>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.textColor};
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
  .inputCheckbox {
    margin-top: 10px;
    width: 240px;
    margin-bottom: 6px;
    height: 20px;
    font-size: 14px;
    font-family: 'Roboto', 'Helvetica';
    border: none;
  }
  .menu {
    display: flex;
    margin-left: 30px;
  }
`;
interface CheckboxProps {
  id: number;
  categoryId: number;
  text: string;
  isCompleted: boolean;
  isEdit?: boolean;
  closeTodo(id: number): void;
}

const ToDoCheckbox: React.FC<CheckboxProps> = ({
  id,
  categoryId,
  text,
  isCompleted,
  closeTodo,
  isEdit = false,
}) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(isEdit);
  const [label, setLabel] = useState(text);
  const [isEmpty, setIsEmpty] = useState(false);
  const [textColor, setTextColor] = useState<EColors>(EColors.black);

  const colors: Array<EColors> = [
    EColors.red,
    EColors.blue,
    EColors.green,
    EColors.black,
  ];

  useEffect(() => {
    label === '' ? setIsEmpty(false) : setIsEmpty(true);
  }, [label]);

  const onChecked = () => {
    localStorageApi.checkedTodo(categoryId, id);
    setIsChecked(!isChecked);
  };

  const onBlur = () => {
    localStorageApi.changeTextTodo(categoryId, id, label);
    !isEmpty && closeTodo(id);
    setEditMode(false);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onBlur();
  };

  return (
    <CheckboxWrap
      textColor={textColor}
      onMouseEnter={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
    >
      <span>
        <FormControlLabel
          className={`label-text ${isChecked ? 'label-text__checked' : ''}`}
          control={
            <Checkbox
              onClick={onChecked}
              checked={isChecked}
              name="checkedB"
              color="primary"
            />
          }
          label={
            editMode ? (
              <div>
                <InputEdit
                  value={label}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLabel(e.target.value)
                  }
                  className="inputCheckbox"
                  onBlur={onBlur}
                  onKeyPress={onKeyPress}
                />
              </div>
            ) : (
              label
            )
          }
        />
        {editMode && !isChecked && (
          <div className="menu">
            <ColorsCircles
              colors={colors}
              currentColor={textColor}
              setEditMode={setEditMode}
              setColor={setTextColor}
            />
          </div>
        )}
      </span>
      {isFocus && (
        <div className="options">
          <EditIcon
            className="iconCheckbox"
            onClick={() => {
              setEditMode(!editMode);
              localStorageApi.changeTextTodo(categoryId, id, label);
            }}
          />
          <CloseIcon className="iconCheckbox" onClick={() => closeTodo(id)} />
        </div>
      )}
    </CheckboxWrap>
  );
};

export default ToDoCheckbox;
