import { ChangeEvent } from 'react';
import styled from 'styled-components';

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
  label: string;
  isChecked: boolean;
  colorText: EColors;
  checkboxTextStyle: ETextStyle;
  useOutsideClick(callback: Function): void;
  setLabel(label: string): void;
  changeTextColor(colorText: EColors): void;
  changeTextStyle(textStyle: ETextStyle): void;
  closeTodo(id: number): void;
  setEditMode(editMode: boolean): void;
  closeMenu: Function;
}

export const EditMenu: React.FC<CheckboxEditMenuProps> = ({
  label,
  colorText,
  isChecked,
  checkboxTextStyle,
  useOutsideClick,
  setLabel,
  changeTextColor,
  changeTextStyle,
  closeMenu,
}) => {
  const colors: Array<EColors> = [
    EColors.red,
    EColors.blue,
    EColors.green,
    EColors.black,
  ];

  const InputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && closeMenu();
  };
  useOutsideClick(closeMenu);

  return (
    <div data-testid="editMenu">
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
                  changeTextStyle(ETextStyle.bold);
                }}
                className="B"
              >
                B
              </div>
            ) : (
              <div
                onClick={() => {
                  changeTextStyle(ETextStyle.normal);
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
