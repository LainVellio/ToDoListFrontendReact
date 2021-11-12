import React from 'react';
import { useTodo } from '../../../Context';
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
  todoId: number;
  categoryId: number;
}

const TodoMenuContent: React.FC<TodoMenuContentProps> = ({
  todoEdit,
  setTodoEdit,
  todoId,
  categoryId,
}) => {
  const { textColor, textStyle, numberingType } = todoEdit;
  const { todo } = useTodo(categoryId, todoId);
  const hasSubTodos = todo.subTodos.length === 0 ? false : true;
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
      {hasSubTodos ? (
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
      ) : null}
    </>
  );
};

export default TodoMenuContent;
