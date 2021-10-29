import styled from 'styled-components';

const CheckboxEditMenuWrap = styled.div<{
  textColor: string;
  textStyle: string;
}>`
  .inputCheckbox {
    position: relative;
    font-weight: ${(props) => props.textStyle};
    width: 230px;
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

export default CheckboxEditMenuWrap;
