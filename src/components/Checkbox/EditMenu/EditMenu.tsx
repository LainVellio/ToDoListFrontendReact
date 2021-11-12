import React, { RefObject, ChangeEvent, useRef, useState } from 'react';

import { EColors, ETextStyle, ITodoEditProperties } from '../../../interfaces';
import { InputEdit } from '../../Form/InputEdit';

import { MenuWrapper } from '../MenuWrapper';
import { useOutsideClick } from '../../../utils/useOutsideClick';

import CheckboxEditMenuWrap from './EditMenu.style';
import checkMaxLengthString from '../../../utils/checkMaxLengthString';

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
  const [hasError, setError] = useState(false);

  useOutsideClick(outsideRef, () => setEditMode(false), true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (checkMaxLengthString(text, 70)) {
      setTodoEdit({ text });
      setError(false);
    } else {
      setError(true);
    }
  };

  console.log(hasError);

  return (
    <div ref={ref} data-testid="editMenu">
      <CheckboxEditMenuWrap textColor={textColor} textStyle={textStyle}>
        <InputEdit
          value={text}
          onChange={onChange}
          setEditMode={() => setEditMode(false)}
          className={`inputCheckbox ${
            isCompleted ? 'label-text__checked' : ''
          } ${hasError ? 'error' : ''}`}
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
