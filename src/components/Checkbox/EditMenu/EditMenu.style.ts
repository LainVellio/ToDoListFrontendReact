import styled from 'styled-components';

const CheckboxEditMenuWrap = styled.div<{
  textColor: string;
  textStyle: string;
}>`
  .inputCheckbox {
    position: relative;
    font-weight: ${(props) => props.textStyle};
    color: ${(props) => props.textColor};
    font-style: ${(props) => props.textStyle};
    width: 225px;
    height: 20px;
    margin-left: -2px;
    font-size: 16px;
    font-family: 'Roboto', 'Helvetica';
    border: none;
    z-index: 2;
  }
  .B {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
    font-family: 'Roboto', 'Helvetica';
    color: black;
    font-weight: '400';
  }
  .addSubTaskIcon {
    cursor: pointer;
    margin-left: 10px;
  }
  .verticalLine {
    height: 20px;
    margin-left: 10px;
    border-left: 1px solid rgb(197, 197, 197);
  }
  .error {
    border: 1px red solid;
  }

  @media screen and (max-width: 400px) {
    .inputCheckbox {
      width: 200px;
    }
  }
`;

export default CheckboxEditMenuWrap;
