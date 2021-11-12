import styled from 'styled-components';
import { EColors } from '../../../interfaces';

const CheckboxWrap = styled.div<{ textColor: string; textStyle: string }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-left: 25px;
  color: ${(props) => props.textColor};
  font-weight: ${(props) => props.textStyle};
  font-style: ${(props) => props.textStyle};
  .label-text__checked {
    text-decoration: line-through;
    color: gray;
    font-weight: normal;
  }
  .options {
    display: flex;
    align-items: center;
    color: #8b8b8b;
    padding: 2px;
    position: absolute;
    right: 0;
    z-index: 1;
    background-color: white;
  }
  .iconCheckbox {
    cursor: pointer;
    width: 19px;
    height: 19px;
  }
  .deleteIcon {
    color: ${EColors.red};
  }
  .addSubTaskIcon {
    cursor: pointer;
  }
  .checkbox {
    display: flex;
    position: relative;
    align-items: center;
  }
  .label {
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }
  .number {
    margin-right: 5px;
  }
  .point {
    font-size: 30px;
    margin-bottom: -4px;
    margin-right: 5px;
  }

  .subTodosContainer {
    display: flex;
  }
  .check {
    margin: -6px 0 -6px 0;
  }
`;

export default CheckboxWrap;
