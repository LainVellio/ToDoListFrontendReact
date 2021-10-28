import React, { RefObject, ChangeEvent, useRef } from 'react';
import styled from 'styled-components';

import {
  EColors,
  ETextStyle,
  ITodoEdit,
  ITodoEditProperties,
} from '../../interfaces';
import { InputEdit } from '../Form/InputEdit';
import { ColorsCircles } from '../ColorCircle/ColorCircles';
import { MenuWrapper } from './MenuWrapper';
import { useOutsideClick } from '../../utils/useOutsideClick';
import useCatchKeydown from '../../utils/useCatchKeydown';

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
  todoEdit: ITodoEdit;
  isCompleted: boolean;
  outsideRef: RefObject<HTMLDivElement>;
  setTodo(properties: ITodoEditProperties): void;
  setEditMode(editMode: boolean): void;
}

export const EditMenu: React.FC<CheckboxEditMenuProps> = ({
  todoEdit,
  isCompleted,
  outsideRef,
  setTodo,
  setEditMode,
}) => {
  const colors: Array<EColors> = [
    EColors.red,
    EColors.blue,
    EColors.green,
    EColors.black,
  ];
  const { text, textColor, textStyle } = todoEdit;
  const ref = useRef<HTMLDivElement>(null);

  const setTextColor = (textColor: EColors) => {
    setTodo({ textColor });
  };

  useCatchKeydown(['Enter', 'Escape'], () => setEditMode(false));
  useOutsideClick(outsideRef, () => setEditMode(false), true);

  return (
    <div ref={ref} data-testid="editMenu">
      <CheckboxEditMenuWrap textColor={textColor} textStyle={textStyle}>
        <InputEdit
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodo({ text: e.target.value })
          }
          className={`inputCheckbox ${
            isCompleted ? 'label-text__checked' : ''
          }`}
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
                  setTodo({ textStyle: ETextStyle.bold });
                }}
                className="B"
              >
                B
              </div>
            ) : (
              <div
                onClick={() => {
                  setTodo({ textStyle: ETextStyle.normal });
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
