import styled from 'styled-components';

import { EColors } from '../../interfaces';

const Circle = styled.div<{ border: boolean }>`
  background-color: ${(props) => props.color};
  font-weight: 900;
  width: 15px;
  height: 15px;
  margin-right: 3px;
  border: ${(props) => (props.border ? '1px solid white' : 'none')};
  border-radius: 15px;
  cursor: pointer;
`;

interface CircleProps {
  color: EColors;
  border?: boolean;
  setEditMode(idEdit: boolean): void;
  setColor(color: EColors): void;
}

const ColorCircle: React.FC<CircleProps> = ({
  color,
  setEditMode,
  setColor,
  border = false,
}) => {
  const selectColor = () => {
    setColor(color);
    setEditMode(false);
  };
  return <Circle onMouseDown={selectColor} color={color} border={border} />;
};

const ColorCircleWraper = styled.div`
  display: flex;
  margin: 10px 0 5px 10px;
`;

export interface ColorCirclesProps {
  colors: Array<EColors>;
  currentColor: string;
  hasBorder?: boolean;
  setEditMode(isEdit: boolean): void;
  setColor(color: EColors): void;
}

export const ColorsCircles: React.FC<ColorCirclesProps> = ({
  colors,
  currentColor,
  setEditMode,
  setColor,
  hasBorder = false,
}) => (
  <ColorCircleWraper>
    {colors.map(
      (color) =>
        currentColor !== color && (
          <ColorCircle
            key={color}
            color={color}
            setEditMode={setEditMode}
            setColor={setColor}
            border={hasBorder}
          />
        ),
    )}
  </ColorCircleWraper>
);
