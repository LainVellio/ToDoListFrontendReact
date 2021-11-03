import React, { RefObject, ChangeEvent, useRef } from 'react';

import { EColors, ETextStyle, ITodoEditProperties } from '../../../interfaces';
import { InputEdit } from '../../Form/InputEdit';

import { MenuWrapper } from '../MenuWrapper';
import { useOutsideClick } from '../../../utils/useOutsideClick';

import CheckboxEditMenuWrap from './EditMenu.style';

export interface CheckboxEditMenuProps {
  text: string;
  textColor: EColors;
  textStyle: ETextStyle;
  isCompleted: boolean;
  outsideRef: RefObject<HTMLDivElement>;
  MenuContent: React.FC;
  setTodoEdit(properties: ITodoEditProperties): void;
  setEditMode(editMode: boolean): void;
}

export const EditMenu: React.FC<CheckboxEditMenuProps> = ({
  text,
  textColor,
  textStyle,
  isCompleted,
  outsideRef,
  MenuContent,
  setTodoEdit,
  setEditMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(outsideRef, () => setEditMode(false), true);

  return (
    <div ref={ref} data-testid="editMenu">
      <CheckboxEditMenuWrap textColor={textColor} textStyle={textStyle}>
        <InputEdit
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodoEdit({ text: e.target.value })
          }
          setEditMode={() => setEditMode(false)}
          className={`inputCheckbox ${
            isCompleted ? 'label-text__checked' : ''
          }`}
        />
        {!isCompleted && (
          <MenuWrapper topShift={30}>
            <MenuContent />
          </MenuWrapper>
        )}
      </CheckboxEditMenuWrap>
    </div>
  );
};
