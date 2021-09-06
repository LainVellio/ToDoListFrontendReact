import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { EColors, ETextStyle, ITodo } from '../../interfaces';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';

import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import localStorageApi from '../../api/localStorageAPI';

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
  .inputCheckbox {
    position: relative;
    font-weight: ${(props) => props.textStyle};
    width: 240px;
    height: 20px;
    margin-left: -2px;
    font-size: 16px;
    font-family: 'Roboto', 'Helvetica';
    border: none;
    color: ${(props) => props.textColor};
    z-index: 2;
  }
  .checkbox {
    display: flex;
    position: relative;
    align-items: center;
  }
  @keyframes menuSlide {
    from {
      top: 10px;
    }
    to {
      top: 34px;
    }
  }
  .menu {
    display: flex;
    position: absolute;
    width: 244px;
    top: 34px;
    left: -2px;
    padding: 0 1px;
    margin-left: 2.5rem;
    background-color: rgba(189, 189, 189, 0.3);
    border-radius: 0px 0px 5px 5px;
    z-index: 1;
    animation: menuSlide 0.7s ease-in-out;
  }
  .editContainer {
  }
  .colorCircles {
    width: 20px;
    height: 20px;
    margin: 3px 7px 7px 3px;
  }
  .B {
    font-size: 20px;
    margin: 2px 0 0 10px;
    cursor: pointer;
    font-family: 'Roboto', 'Helvetica';
    color: black;
    font-weight: ${(props) => (props.textStyle === '400' ? '900' : '400')};
  }
  @media screen and (max-width: 400px) {
    .inputCheckbox {
      width: 200px;
    }
    .menu {
      width: 205px;
    }
  }
`;
interface CheckboxProps extends ITodo {
  categoryId: number;
  isEdit?: boolean;
  closeTodo(id: number): void;
}

const ToDoCheckbox: React.FC<CheckboxProps> = ({
  id,
  categoryId,
  text,
  textColor,
  isCompleted,
  closeTodo,
  isEdit = false,
  textStyle,
}) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(isEdit);
  const [label, setLabel] = useState(text);
  const [isEmpty, setIsEmpty] = useState(false);
  const [colorText, setColorText] = useState<EColors>(textColor);
  const [checkboxTextStyle, setTextStyle] = useState(textStyle);

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

  const changeTextColor = (color: EColors) => {
    setColorText(color);
    localStorageApi.changeTextColor(categoryId, id, color);
  };

  const onEdit = () => {
    setEditMode(!editMode);
    localStorageApi.changeTextTodo(categoryId, id, label);
  };

  return (
    <CheckboxWrap
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
            <div className={`editContainer`}>
              <InputEdit
                value={label}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLabel(e.target.value)
                }
                className={`inputCheckbox ${
                  isChecked ? 'label-text__checked' : ''
                }`}
                onBlur={onBlur}
                onKeyPress={onKeyPress}
              />
              {!isChecked && (
                <div className={`menu`}>
                  <ColorsCircles
                    colors={colors}
                    currentColor={colorText}
                    setColor={changeTextColor}
                    className="colorCircles"
                  />
                  {checkboxTextStyle !== ETextStyle.bold ? (
                    <div
                      onClick={() => {
                        setTextStyle(ETextStyle.bold);
                        localStorageApi.changeTextStyle(
                          categoryId,
                          id,
                          ETextStyle.bold,
                        );
                      }}
                      className="B"
                    >
                      B
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setTextStyle(ETextStyle.normal);
                        localStorageApi.changeTextStyle(
                          categoryId,
                          id,
                          ETextStyle.normal,
                        );
                      }}
                      className="B"
                    >
                      N
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            label
          )}
        </div>
      </span>
      {isFocus && (
        <div className="options">
          <EditIcon className="iconCheckbox" onClick={onEdit} />
          <CloseIcon className="iconCheckbox" onClick={() => closeTodo(id)} />
        </div>
      )}
    </CheckboxWrap>
  );
};

export default ToDoCheckbox;
