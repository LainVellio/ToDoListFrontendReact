import { useState } from 'react';
import styled from 'styled-components';
import { Todo } from '../../App';
import serverAPI from '../../api/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxWrap = styled.div`
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
    <CheckboxWrap onClick={onChecked}>
      <FormControlLabel
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
    </CheckboxWrap>
  );
};

export default ToDoCheckbox;
