import { useState } from 'react';
import styled from 'styled-components';
import serverAPI from '../../api/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  id: number;
  text: string;
  isCompleted: boolean;
  closeTodo: Function;
}

const CheckboxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .label-text__checked {
    text-decoration: line-through;
    color: gray;
  }
  .label-text__disabled {
    color: #d8d8d8;
  }
  .closeIcon {
    cursor: pointer;
    color: #8b8b8b;
    margin-top: 10px;
    padding: 2px;
    width: 20px;
    height: 20px;
  }
`;

const ToDoCheckbox = ({ id, text, isCompleted, closeTodo }: IProps) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const onChecked = async () => {
    try {
      setIsDisabled(true);
      await serverAPI.todoChecked(id);
      setIsChecked(!isChecked);
      setIsDisabled(false);
    } catch (error) {
      alert(error);
    }
  };

  const onMouseEnter = () => {
    setIsFocus(true);
  };

  const onMouseLeave = () => {
    setIsFocus(false);
  };

  const onClose = () => {
    closeTodo(id);
  };

  return (
    <CheckboxWrap onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
