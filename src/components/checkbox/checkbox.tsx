import { useState } from 'react';
import styled from 'styled-components';
import uncheckedImg from '../../assets/images/unchecked.png';
import checkedImg from '../../assets/images/checked.png';
import disabledCheckedImg from '../../assets/images/disabledChecked.png';
import disabledUncheckedImg from '../../assets/images/disabledUnchecked.png';
import { Todo } from '../../App';
import serverAPI from '../../api/api';

const Checkbox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin: 10px 0px;
  cursor: pointer;

  .checkbox {
    cursor: pointer;
    position: absolute;
    width: 15px;
    height: 15px;
  }
  .checkbox-img {
    width: 20px;
    width: 20px;
    z-index: 1;
  }
  .label-text {
    margin-left: 5px;
  }
  .label-text__checked {
    text-decoration: line-through;
  }
  .label-text__disabled {
    color: #d8d8d8;
  }
`;

const ToDoCheckbox = ({ id, text, isCompleted }: Todo) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isDisabled, setIsDisabled] = useState(false);

  const onChecked = async () => {
    setIsDisabled(true);
    await serverAPI.todoChecked(id);
    setIsChecked(!isChecked);
    setIsDisabled(false);
  };

  return (
    <Checkbox onClick={onChecked}>
      <input
        className={'checkbox'}
        type="checkbox"
        onChange={onChecked}
        checked={isChecked}
        disabled={isDisabled}
      />
      <img
        src={
          isDisabled
            ? isChecked
              ? disabledCheckedImg
              : disabledUncheckedImg
            : isChecked
            ? checkedImg
            : uncheckedImg
        }
        className={'checkbox-img'}
        alt=""
      />
      <div
        className={`label-text ${isChecked ? 'label-text__checked' : ''} ${
          isDisabled ? 'label-text__disabled' : ''
        }`}
      >
        {text}
      </div>
    </Checkbox>
  );
};

export default ToDoCheckbox;
