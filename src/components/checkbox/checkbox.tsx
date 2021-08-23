import { useState } from 'react';
import styled from 'styled-components';
import { Todo } from '../../App';
import serverAPI from '../../api/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';

const CheckboxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .label-text__checked {
    text-decoration: line-through;
  }
  .label-text__disabled {
    color: #d8d8d8;
  }
  .closeIcon {
    cursor: pointer;
    margin-top: 10px;
    width: 20px;
    height: 20px;
  }
`;

const ToDoCheckbox = ({ id, text, isCompleted }: Todo) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const onChecked = async () => {
    setIsDisabled(true);
    await serverAPI.todoChecked(id);
    setIsChecked(!isChecked);
    setIsDisabled(false);
  };

  const onMouseOver = () => {
    setIsFocus(true);
    console.log(isFocus);
  };

  const onMouseOut = () => {
    setIsFocus(false);
    console.log(isFocus);
  };

  const onClose = () => {};

  return (
    <CheckboxWrap onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <FormControlLabel
        onClick={onChecked}
        className={`label-text ${isChecked ? 'label-text__checked' : ''}`}
        control={
          <Checkbox
            checked={isChecked}
            onChange={onChecked}
            name="checkedB"
            color="primary"
            disabled={isDisabled}
          />
        }
        label={text}
      />
      {isFocus && (
        <div className="closeIcon">
          <CloseIcon onClick={onClose} />
        </div>
      )}
    </CheckboxWrap>
  );
};

export default ToDoCheckbox;
