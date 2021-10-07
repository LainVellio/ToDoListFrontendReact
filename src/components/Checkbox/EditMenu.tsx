import { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';

import { EColors, ETextStyle, IGroupTodo, ITodo } from '../../interfaces';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';
import { MenuWrapper } from './MenuWrapper';

const CheckboxEditMenuWrap = styled.div<{
  textColor: string;
  textStyle: string;
}>`
  .inputCheckbox {
    position: relative;
    font-weight: ${(props) => props.textStyle};
    width: 230px;
    height: 20px;
    margin-left: -2px;
    font-size: 16px;
    font-family: 'Roboto', 'Helvetica';
    border: none;
    color: ${(props) => props.textColor};
    z-index: 2;
  }
  .colorCircles {
    width: 20px;
    height: 20px;
    margin: 3px 7px 7px 3px;
  }
  .B {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
    font-family: 'Roboto', 'Helvetica';
    color: black;
    font-weight: ${(props) => (props.textStyle === '400' ? '900' : '400')};
  }
  .addSubTaskIcon {
    cursor: pointer;
    margin-left: 10px;
  }

  @media screen and (max-width: 400px) {
    .inputCheckbox {
      width: 200px;
    }
  }
`;

export interface CheckboxEditMenuProps {
  todo: IGroupTodo | ITodo;
  isCompleted: boolean;
  setTodo(todo: IGroupTodo | ITodo): void;
  setEditMode(editMode: boolean): void;
  useOutsideClick(callback: Function): void;
}

export const EditMenu: React.FC<CheckboxEditMenuProps> = ({
  todo,
  isCompleted,
  setTodo,
  setEditMode,
  useOutsideClick,
}) => {
  const colors: Array<EColors> = [
    EColors.red,
    EColors.blue,
    EColors.green,
    EColors.black,
  ];
  const { text, textColor, textStyle } = todo;
  const ref = useRef(null);

  const setText = (text: string) => {
    setTodo({ ...todo, text });
  };
  const setTextColor = (textColor: EColors) => {
    setTodo({ ...todo, textColor });
  };
  const setTextStyle = (textStyle: ETextStyle) => {
    setTodo({ ...todo, textStyle });
  };

  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && setEditMode(false);
  };
  useOutsideClick(() => setEditMode(false));

  return (
    <div ref={ref} data-testid="editMenu">
      <CheckboxEditMenuWrap textColor={textColor} textStyle={textStyle}>
        <InputEdit
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          className={`inputCheckbox ${
            isCompleted ? 'label-text__checked' : ''
          }`}
          onKeyPress={InputKeyPress}
        />
        {!isCompleted && (
          <MenuWrapper topShift={30}>
            <ColorsCircles
              colors={colors}
              currentColor={textColor}
              setColor={setTextColor}
              className="colorCircles"
            />
            {textStyle !== ETextStyle.bold ? (
              <div
                onClick={() => {
                  setTextStyle(ETextStyle.bold);
                }}
                className="B"
              >
                B
              </div>
            ) : (
              <div
                onClick={() => {
                  setTextStyle(ETextStyle.normal);
                }}
                className="B"
              >
                N
              </div>
            )}
          </MenuWrapper>
        )}
      </CheckboxEditMenuWrap>
    </div>
  );
};
