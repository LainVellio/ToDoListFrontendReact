import styled from 'styled-components';

export enum Colors {
  red = '#df0b52',
  blue = '#1976d2',
  green = 'green',
  black = 'black',
}

interface IPropsCircle {
  color: Colors;
  setColor: Function;
  setEditMode: Function;
  border?: boolean;
}

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
const ColorCircle = ({
  color,
  setEditMode,
  setColor,
  border = false,
}: IPropsCircle) => {
  const selectColor = () => {
    setColor(color);
    setEditMode(false);
    console.log(color);
  };
  return <Circle onMouseDown={selectColor} color={color} border={border} />;
};

export default ColorCircle;
