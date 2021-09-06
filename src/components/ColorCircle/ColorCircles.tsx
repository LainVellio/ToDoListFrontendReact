import styled from 'styled-components';

import { EColors } from '../../interfaces';

const Circle = styled.div<{ border: boolean }>`
  background-color: ${(props) => props.color};
  cursor: pointer;
  font-weight: 900;
  border-radius: 15px;
`;

interface CircleProps {
  color: EColors;
  border?: boolean;
  className?: string;
  setColor(color: EColors): void;
}

const ColorCircle: React.FC<CircleProps> = ({
  color,
  setColor,
  border = false,
  className,
}) => {
  const selectColor = () => {
    setColor(color);
  };
  return (
    <Circle
      className={className}
      onMouseDown={selectColor}
      color={color}
      border={border}
    />
  );
};

const ColorCircleWraper = styled.div`
  display: flex;
`;

export interface ColorCirclesProps {
  colors: Array<EColors>;
  currentColor: string;
  hasBorder?: boolean;
  className?: string;
  setColor(color: EColors): void;
}

export const ColorsCircles: React.FC<ColorCirclesProps> = ({
  colors,
  currentColor,
  setColor,
  hasBorder = false,
  className,
}) => (
  <ColorCircleWraper>
    {colors.map(
      (color) =>
        currentColor !== color && (
          <ColorCircle
            className={className}
            key={color}
            color={color}
            setColor={setColor}
            border={hasBorder}
          />
        ),
    )}
  </ColorCircleWraper>
);
