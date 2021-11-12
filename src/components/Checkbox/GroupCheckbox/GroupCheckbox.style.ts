import styled from 'styled-components';

const CheckboxWrap = styled.div<{ textColor: string; textStyle: string }>`
  position: relative;
  align-items: center;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.textColor};
  font-weight: ${(props) => props.textStyle};
  font-style: ${(props) => props.textStyle};
  margin-left: 10px;
  .label-text__checked {
    text-decoration: line-through;
    color: gray;
    font-weight: normal;
  }
  .options {
    position: absolute;
    right: 0;
    z-index: 1;
    color: #8b8b8b;
    margin-top: 10px;
    padding: 2px;
    background-color: white;
  }
  .iconCheckbox {
    cursor: pointer;
    width: 19px;
    height: 19px;
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
  .arrowIcon {
    position: absolute;
    display: flex;
    margin-left: -18px;
    cursor: pointer;
    color: gray;
  }
  .colorCircles {
    width: 20px;
    height: 20px;
    margin: 3px 0px 7px 10px;
  }
`;

export default CheckboxWrap;
