import { useState } from 'react';
import styled from 'styled-components';
import uncheckedImg from '../../assets/images/unchecked.png';
import checkedImg from '../../assets/images/checked.png';
import { Todo } from '../../App';

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
`;

const ToDoCheckbox = ({ id, text, isCompleted }: Todo) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const onChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Checkbox onClick={onChecked}>
      <input
        className={'checkbox'}
        type="checkbox"
        onChange={onChecked}
        checked={isChecked}
      />
      <img
        src={isChecked ? checkedImg : uncheckedImg}
        className={'checkbox-img'}
        alt=""
      />
      <div className={`label-text ${isChecked ? 'label-text__checked' : ''}`}>
        {text}
      </div>
    </Checkbox>
  );
};

export default ToDoCheckbox;
