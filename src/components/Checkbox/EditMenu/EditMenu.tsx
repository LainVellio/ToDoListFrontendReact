import React, { RefObject, ChangeEvent, useRef } from 'react';

import {
  EColors,
  ETextStyle,
  ITodoEdit,
  ITodoEditProperties,
} from '../../../interfaces';
import { InputEdit } from '../../Form/InputEdit';
import { ColorsCircles } from '../../ColorCircle/ColorCircles';
import { MenuWrapper } from '../MenuWrapper';
import { useOutsideClick } from '../../../utils/useOutsideClick';
import useCatchKeydown from '../../../utils/useCatchKeydown';

import CheckboxEditMenuWrap from './EditMenu.style';

export interface CheckboxEditMenuProps {
  todoEdit: ITodoEdit;
  isCompleted: boolean;
  outsideRef: RefObject<HTMLDivElement>;
  setTodo(properties: ITodoEditProperties): void;
  setEditMode(editMode: boolean): void;
}

const colors: Array<EColors> = [
  EColors.red,
  EColors.blue,
  EColors.green,
  EColors.black,
];

export const EditMenu: React.FC<CheckboxEditMenuProps> = ({
  todoEdit,
  isCompleted,
  outsideRef,
  setTodo,
  setEditMode,
}) => {
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
