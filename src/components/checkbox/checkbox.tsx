import { useState } from 'react';
import styled from 'styled-components';
import serverAPI from '../../api/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

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
  .options {
    color: #8b8b8b;
    margin-top: 10px;
    padding: 2px;
  }
  .icon {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  .input {
    margin-top: 10px;
    width: 250px;
    margin-bottom: 6px;
    height: 20px;
  }
`;

const ToDoCheckbox = ({ id, text, isCompleted, closeTodo }: IProps) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [label, setLabel] = useState(text);

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

  const handleChange = (e: any) => {
    setLabel(e.target.value);
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
  const onEdit = () => {
    setEditMode(!editMode);
  };
  const onBlur = () => {
    setEditMode(false);
  };

  return (
    <CheckboxWrap onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <FormControlLabel
        className={`label-text ${isChecked ? 'label-text__checked' : ''}`}
        control={
          <Checkbox
            onClick={onChecked}
            checked={isChecked}
            onChange={onChecked}
            name="checkedB"
            color="primary"
            disabled={isDisabled}
          />
        }
        label={
          editMode ? (
            <input
              value={label}
              onChange={(e) => {
                handleChange(e);
              }}
              className="input"
              autoFocus
              type="text"
              onBlur={onBlur}
            />
          ) : (
            label
          )
        }
      />

      {isFocus && (
        <div className="options">
          <EditIcon className="icon" onClick={onEdit} />
          <CloseIcon className="icon" onClick={onClose} />
        </div>
      )}
    </CheckboxWrap>
  );
};

export default ToDoCheckbox;
