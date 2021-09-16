import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import localStorageApi from '../../api/localStorageAPI';
import { EColors, ETextStyle } from '../../interfaces';
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
    width: 240px;
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
  }
`;

interface CheckboxEditMenuProps {
  label: string;
  id: number;
  categoryId: number;
  isChecked: boolean;
  colorText: EColors;
  checkboxTextStyle: ETextStyle;
  useOutsideClick(callback: Function): void;
  setLabel(label: string): void;
  setColorText(colorText: EColors): void;
  setTextStyle(textStyle: ETextStyle): void;
  closeTodo(id: number): void;
  setEditMode(editMode: boolean): void;
}

export const EditMenu: React.FC<CheckboxEditMenuProps> = ({
  label,
  categoryId,
  id,
  colorText,
  isChecked,
  checkboxTextStyle,
  useOutsideClick,
  setLabel,
  setColorText,
  setTextStyle,
  closeTodo,
  setEditMode,
}) => {
  const colors: Array<EColors> = [
    EColors.red,
    EColors.blue,
    EColors.green,
    EColors.black,
  ];

  const closeMenu = () => {
    localStorageApi.changeTextTodo(categoryId, id, label);
    label === '' && closeTodo(id);
    setEditMode(false);
  };
  useOutsideClick(closeMenu);

  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && closeMenu();
  };

  const changeTextColor = (color: EColors) => {
    setColorText(color);
    localStorageApi.changeTextColor(categoryId, id, color);
  };
  return (
    <div>
      <CheckboxEditMenuWrap textColor={colorText} textStyle={checkboxTextStyle}>
        <InputEdit
          value={label}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value)
          }
          className={`inputCheckbox ${isChecked ? 'label-text__checked' : ''}`}
          onKeyPress={InputKeyPress}
        />
        {!isChecked && (
          <MenuWrapper topShift={30}>
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
          </MenuWrapper>
        )}
      </CheckboxEditMenuWrap>
    </div>
  );
};
