import React from 'react';
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

export const ColorCircle: React.FC<CircleProps> = ({
  color,
  setColor,
  border = false,
  className,
}) => {
  return (
    <>
      <Circle
        data-testid="circle"
        className={className}
        onClick={() => setColor(color)}
        color={color}
        border={border}
      />
    </>
  );
};

const ColorCircleWrapper = styled.div`
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
  <ColorCircleWrapper>
    {colors.map(
      (color) =>
        currentColor !== color && (
          <ColorCircle
            key={color}
            color={color}
            className={className}
            border={hasBorder}
            setColor={setColor}
          />
        ),
    )}
  </ColorCircleWrapper>
);
