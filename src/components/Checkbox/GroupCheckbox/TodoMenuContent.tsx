import React from 'react';
import {
  EColors,
  EditMenuItemType,
  ENumberingType,
  ETextStyle,
  ITodoEdit,
  ITodoEditProperties,
} from '../../../interfaces';
import { ColorCircle } from '../../ColorCircle/ColorCircles';
import EditMenuItems from '../EditMenu/EditMenuItems';

const colors: EditMenuItemType<EColors>[] = [
  { value: EColors.red },
  { value: EColors.blue },
  { value: EColors.green },
  { value: EColors.black },
];
const styles: EditMenuItemType<ETextStyle>[] = [
  { letter: 'N', value: ETextStyle.normal },
  { letter: 'B', value: ETextStyle.bold },
  { letter: 'I', value: ETextStyle.italic },
];
const numberingTypes: EditMenuItemType<ENumberingType>[] = [
  { letter: '∅', value: ENumberingType.void },
  { letter: '1', value: ENumberingType.number },
  { letter: '•', value: ENumberingType.point },
];

interface TodoMenuContentProps {
  todoEdit: ITodoEdit;
  setTodoEdit(properties: ITodoEditProperties): void;
}

const TodoMenuContent: React.FC<TodoMenuContentProps> = ({
  todoEdit,
  setTodoEdit,
}) => {
  const { textColor, textStyle, numberingType } = todoEdit;
  const setTextColor = (textColor: EColors) => {
    setTodoEdit({ textColor });
  };

  return (
    <>
      <EditMenuItems
        items={colors}
        renderItem={(item: EditMenuItemType<EColors>) => (
          <ColorCircle
            className="colorCircles"
            color={item.value}
            setColor={setTextColor}
          />
        )}
        currentItem={textColor}
      />
      <div className="verticalLine" />
      <EditMenuItems
        items={styles}
        renderItem={(item: EditMenuItemType<ETextStyle>) => (
          <div
            onClick={() => {
              setTodoEdit({ textStyle: item.value });
            }}
            className="B"
          >
            {item.letter}
          </div>
        )}
        currentItem={textStyle}
      />
      <div className="verticalLine" />
      <EditMenuItems
        items={numberingTypes}
        renderItem={(item: EditMenuItemType<ENumberingType>) => (
          <div
            onClick={() => {
              setTodoEdit({ numberingType: item.value });
            }}
            className="B"
          >
            {item.letter}
          </div>
        )}
        currentItem={numberingType}
      />
    </>
  );
};

export default TodoMenuContent;
