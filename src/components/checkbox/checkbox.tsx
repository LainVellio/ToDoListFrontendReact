import { useEffect, useState } from 'react';
import styled from 'styled-components';
import serverAPI from '../../api/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import InputEdit from '../Form/InputEdit';
import ColorCircle, { Colors } from './ColorCircle';

interface IProps {
  id: number;
  text: string;
  isCompleted: boolean;
  closeTodo: Function;
  isEdit?: boolean;
}

const CheckboxWrap = styled.div<{ textColor: string }>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.textColor};
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
  .iconCheckbox {
    cursor: pointer;
    width: 19px;
    height: 19px;
  }
  .inputCheckbox {
    margin-top: 10px;
    width: 240px;
    margin-bottom: 6px;
    height: 20px;
    font-size: 14px;
    font-family: 'Roboto', 'Helvetica';
    border: none;
  }
  .menu {
    display: flex;
    margin-left: 30px;
  }
`;

const ToDoCheckbox = ({
  id,
  text,
  isCompleted,
  closeTodo,
  isEdit = false,
}: IProps) => {
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [editMode, setEditMode] = useState(isEdit);
  const [label, setLabel] = useState(text);
  const [isEmpty, setIsEmpty] = useState(false);
  const [textColor, setTextColor] = useState<Colors>(Colors.black);

  const colors: Array<Colors> = [
    Colors.red,
    Colors.blue,
    Colors.green,
    Colors.black,
  ];

  useEffect(() => {
    label === '' ? setIsEmpty(false) : setIsEmpty(true);
  }, [label]);

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
    console.log('onEdit');
  };
  const onBlur = () => {
    !isEmpty && closeTodo(id);
    setEditMode(false);
    console.log('onBlur');
  };

  return (
    <CheckboxWrap
      textColor={textColor}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>
        <FormControlLabel
          className={`label-text ${isChecked ? 'label-text__checked' : ''}`}
          control={
            <Checkbox
              onClick={onChecked}
              checked={isChecked}
              name="checkedB"
              color="primary"
              disabled={isDisabled}
            />
          }
          label={
            editMode ? (
              <div>
                <InputEdit
                  value={label}
                  onChange={handleChange}
                  className="inputCheckbox"
                  onBlur={onBlur}
                />
              </div>
            ) : (
              label
            )
          }
        />
        {editMode && (
          <div className="menu">
            {colors.map((color) => (
              <ColorCircle
                key={color}
                color={color}
                setEditMode={setEditMode}
                setColor={setTextColor}
              />
            ))}
          </div>
        )}
      </span>
      {isFocus && (
        <div className="options">
          <EditIcon className="iconCheckbox" onClick={onEdit} />
          <CloseIcon className="iconCheckbox" onClick={onClose} />
        </div>
      )}
    </CheckboxWrap>
  );
};

export default ToDoCheckbox;
